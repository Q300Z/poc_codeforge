export * from "./types.js";
export * from "./registry.js";
export * from "./renderer.js";
export * from "./setup.js";
export * from "./utils/factory.js";
export * from "./utils/style.js";
export * from "./utils/validator.js";
export * from "./utils/builder.js";
export * from "./adapter/screendraft.js";
export { isScreenDraft } from "./utils/detection.js";

// Export des composants, types et builders autonomes
export * from "./components/AppBar.js";
export * from "./components/Box.js";
export * from "./components/Button.js";
export * from "./components/Carousel.js";
export * from "./components/Container.js";
export * from "./components/Form.js";
export * from "./components/FormField.js";
export * from "./components/Grid.js";
export * from "./components/Hero.js";
export * from "./components/Image.js";
export * from "./components/Map.js";
export * from "./components/Page.js";
export * from "./components/Section.js";
export * from "./components/Select.js";
export * from "./components/Stack.js";
export * from "./components/Table.js";
export * from "./components/Text.js";
export * from "./components/Textarea.js";
export * from "./components/Title.js";
export * from "./components/Video.js";

import path from "path";
import fs from "fs";
import { setupRegistry } from "./setup.js";
import { render } from "./renderer.js";
import { SiteNode } from "./types.js";
import { ScreenDraftAdapter } from "./adapter/screendraft.js";
import { isScreenDraft } from "./utils/detection.js";
import { minifyHTML } from "./utils/html.js";
import { PurgeCSS } from "purgecss";
import { renderState } from "./utils/state.js";
import { validateSiteSchema } from "./utils/validator.zod.js";

/**
 * Génère un site statique de manière autonome.
 */
export async function buildSite(
  jsonPath: string, 
  outDir: string = "dist-static",
  options: { inline?: boolean; minify?: boolean } = { minify: true }
) {
  setupRegistry();
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);
  const absoluteOutDir = path.resolve(process.cwd(), outDir);
  
  const isMinify = options.minify !== false;
  
  // Nettoyage du dossier de sortie
  if (fs.existsSync(absoluteOutDir)) {
    fs.rmSync(absoluteOutDir, { recursive: true, force: true });
  }
  fs.mkdirSync(absoluteOutDir, { recursive: true });

  if (!fs.existsSync(absoluteJsonPath)) {
    throw new Error(`JSON file not found: ${absoluteJsonPath}`);
  }

  const rawData = fs.readFileSync(absoluteJsonPath, "utf-8");
  const jsonContent = JSON.parse(rawData);
  let siteData: SiteNode;

  if (isScreenDraft(jsonContent)) {
    siteData = await ScreenDraftAdapter.transform(jsonContent);
  } else {
    siteData = jsonContent;
  }

  // Validation stricte du schéma
  validateSiteSchema(siteData);

  // 1. Assets
  const foldersToCopy = options.inline ? ["images"] : ["libs", "images"];
  for (const folder of foldersToCopy) {
    const src = path.resolve(process.cwd(), folder);
    if (fs.existsSync(src)) {
      copyFolderSync(src, path.join(absoluteOutDir, folder));
    }
  }

  // 2. CSS
  const srcCss = path.resolve(process.cwd(), "src/style.css");
  const distCss = path.resolve(process.cwd(), "dist/style.css");
  const cssSrc = fs.existsSync(distCss) ? distCss : srcCss;

  let globalCssContent = "";
  if (fs.existsSync(cssSrc)) {
    globalCssContent = fs.readFileSync(cssSrc, "utf-8");
    if (!options.inline) {
      fs.writeFileSync(path.join(absoluteOutDir, "style.css"), globalCssContent);
    }
  }

  // 3. Libs (Inlining)
  let mapLibJsContent = "";
  let mapLibCssContent = "";
  if (options.inline) {
    const jsSrc = path.resolve(process.cwd(), "libs/leaflet.js");
    const cssSrc = path.resolve(process.cwd(), "libs/leaflet.css");
    
    if (fs.existsSync(jsSrc)) mapLibJsContent = fs.readFileSync(jsSrc, "utf-8");
    if (fs.existsSync(cssSrc)) mapLibCssContent = fs.readFileSync(cssSrc, "utf-8");
  }

  // 4. Rendu
  for (const page of siteData.pages) {
    renderState.clear();
    // On clone le contenu pour ne pas polluer les autres pages
    const pageContent = JSON.parse(JSON.stringify(page.content));
    
    pageContent.meta = {
      ...pageContent.meta,
      appName: siteData.meta.appName,
      cssPath: "./style.css",
      isInline: options.inline, // Nouveau flag
      ...(options.inline ? {
        mapLibJsContent,
        mapLibCssContent
      } : {})
    };
    
    pageContent.style = { ...siteData.style, ...pageContent.style };

    if (siteData.layout?.header) {
      propagateMeta(siteData.layout.header, {});
      pageContent.meta.renderedHeader = render(siteData.layout.header);
    }
    if (siteData.layout?.footer) {
      propagateMeta(siteData.layout.footer, {});
      pageContent.meta.renderedFooter = render(siteData.layout.footer);
    }

    propagateMeta(pageContent, { 
      isInline: options.inline,
      mapLibJsContent: options.inline ? mapLibJsContent : undefined,
      mapLibCssContent: options.inline ? mapLibCssContent : undefined 
    });

    let html = render(pageContent);
    // Optimisation CSS par page en mode Inline
    if (options.inline && globalCssContent) {
      const purged = await new PurgeCSS().purge({
        content: [{ extension: "html", raw: html }],
        css: [{ raw: globalCssContent }],
        // Extracteur recommandé par la communauté Tailwind (voir vos liens)
        defaultExtractor: (content) => {
          // Capture les classes avec :, [], #, (), /, etc.
          return content.match(/[A-Za-z0-9-_/:!\[\]#%.]+/g) || [];
        },
        safelist: {
          standard: [/^leaflet-/, /^carousel-/, /^bg-/, /^min-h-/],
          deep: [/leaflet/, /carousel/]
        }
      });
      
      const optimizedCss = purged[0].css;
      html = html.replace("</head>", `<style>${optimizedCss}</style></head>`);
    }

    if (isMinify) html = minifyHTML(html);
    
    fs.writeFileSync(path.join(absoluteOutDir, `${page.slug}.html`), html);
  }
}

/**
 * Propage récursivement des métadonnées à tous les enfants d'un nœud.
 */
function propagateMeta(node: any, metaToPass: Record<string, any>) {
  // Détection du fond actuel pour le calcul du contraste des enfants
  let currentBg = metaToPass.parentBg;
  let currentBgDark = metaToPass.parentBgDark;

  if (node.style) {
    currentBg = node.style["section-bg"] || node.style["hero-bg"] || node.style["box-bg"] || currentBg;
  }
  if (node.styleDark) {
    currentBgDark = node.styleDark["section-bg"] || node.styleDark["hero-bg"] || node.styleDark["box-bg"] || currentBgDark;
  }

  node.meta = { ...node.meta, ...metaToPass, parentBg: currentBg, parentBgDark: currentBgDark };
  
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      propagateMeta(child, { ...metaToPass, parentBg: currentBg, parentBgDark: currentBgDark });
    }
  }
}

/**
 * Utilitaire de copie récursive de dossier.
 */
function copyFolderSync(from: string, to: string) {
  if (!fs.existsSync(to)) fs.mkdirSync(to, { recursive: true });
  fs.readdirSync(from).forEach(element => {
    const srcPath = path.join(from, element);
    const destPath = path.join(to, element);
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyFolderSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}