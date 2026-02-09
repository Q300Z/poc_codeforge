export * from "./types.js";
export * from "./registry.js";
export * from "./renderer.js";
export * from "./setup.js";
export * from "./utils/factory.js";
export * from "./utils/style.js";
export * from "./utils/validator.js";
export * from "./utils/builder.js";

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
import { fileURLToPath } from "url";
import { setupRegistry } from "./setup.js";
import { render } from "./renderer.js";
import { SiteNode } from "./types.js";
import { ScreenDraftAdapter } from "./adapter/screendraft.js";
import { isScreenDraft } from "./utils/detection.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Génère un site statique de manière autonome.
 * Utilise des chemins relatifs et copie les assets bruts.
 */
export async function buildSite(
  jsonPath: string, 
  outDir: string = "dist-static",
  options: { inline?: boolean } = {}
) {
  setupRegistry();
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);
  const absoluteOutDir = path.resolve(process.cwd(), outDir);
  
  // Nettoyage du dossier de sortie pour garantir l'autonomie du build
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
    siteData = ScreenDraftAdapter.transform(jsonContent);
  } else {
    siteData = jsonContent;
  }

  // 1. Gestion des dossiers d'assets (libs, images)
  // On ne copie 'libs' que si on n'est PAS en mode inline
  const foldersToCopy = options.inline ? ["images"] : ["libs", "images"];
  for (const folder of foldersToCopy) {
    const src = path.resolve(process.cwd(), folder);
    if (fs.existsSync(src)) {
      copyFolderSync(src, path.join(absoluteOutDir, folder));
    }
  }

  // 2. Gestion du style CSS (Copie ou Lecture pour Inlining)
  const distCss = path.resolve(__dirname, "style.css");
  const srcCss = path.resolve(process.cwd(), "src/style.css");
  const cssSrc = fs.existsSync(distCss) ? distCss : srcCss;

  let cssContent = "";
  if (fs.existsSync(cssSrc)) {
    if (options.inline) {
      cssContent = fs.readFileSync(cssSrc, "utf-8");
    } else {
      fs.copyFileSync(cssSrc, path.join(absoluteOutDir, "style.css"));
    }
  }

  // 3. Gestion du JS et CSS des bibliothèques (Lecture pour Inlining si demandé)
  let mapLibJsContent = "";
  let mapLibCssContent = "";
  if (options.inline) {
    const jsSrc = path.resolve(process.cwd(), "libs/leaflet.js");
    const cssSrc = path.resolve(process.cwd(), "libs/leaflet.css");
    
    if (fs.existsSync(jsSrc)) {
      mapLibJsContent = fs.readFileSync(jsSrc, "utf-8");
    }
    if (fs.existsSync(cssSrc)) {
      mapLibCssContent = fs.readFileSync(cssSrc, "utf-8");
    }
  }

  // 4. Rendu des pages
  for (const page of siteData.pages) {
    page.content.meta = page.content.meta || {};
    page.content.meta.appName = siteData.meta.appName;
    page.content.meta.cssPath = "./style.css";
    
    // Injection du CSS et JS en ligne si demandé
    if (options.inline) {
      page.content.meta.inlineCss = cssContent;
      page.content.meta.mapLibJsContent = mapLibJsContent;
      page.content.meta.mapLibCssContent = mapLibCssContent;
    }
    
    page.content.style = { ...siteData.style, ...page.content.style };

    if (page.content.meta) {
      if (siteData.layout?.header) page.content.meta.renderedHeader = render(siteData.layout.header);
      if (siteData.layout?.footer) page.content.meta.renderedFooter = render(siteData.layout.footer);
    }

    // Propagation récursive des métadonnées globales aux enfants
    propagateMeta(page.content, { 
      mapLibJsContent: options.inline ? mapLibJsContent : undefined,
      mapLibCssContent: options.inline ? mapLibCssContent : undefined 
    });

    const html = render(page.content);
    fs.writeFileSync(path.join(absoluteOutDir, `${page.slug}.html`), html);
  }
}

/**
 * Propage récursivement des métadonnées à tous les enfants d'un nœud.
 */
function propagateMeta(node: any, metaToPass: Record<string, any>) {
  node.meta = { ...node.meta, ...metaToPass };
  if (node.children && Array.isArray(node.children)) {
    for (const child of node.children) {
      propagateMeta(child, metaToPass);
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