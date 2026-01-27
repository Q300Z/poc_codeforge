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
export * from "./components/Grid.js";
export * from "./components/Hero.js";
export * from "./components/Image.js";
export * from "./components/Page.js";
export * from "./components/Section.js";
export * from "./components/Stack.js";
export * from "./components/Text.js";
export * from "./components/Title.js";
export * from "./components/Video.js";

import { build as viteBuild } from "vite";
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

export async function buildSite(
  jsonPath: string, 
  outDir: string = "generated", 
  options: { inlineCss?: boolean } = {}
) {
  setupRegistry();
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);
  const absoluteOutDir = path.resolve(process.cwd(), outDir);
  
  if (!fs.existsSync(absoluteJsonPath)) {
    throw new Error(`JSON file not found: ${absoluteJsonPath}`);
  }

  const rawData = fs.readFileSync(absoluteJsonPath, "utf-8");
  const jsonContent = JSON.parse(rawData);
  let siteData: SiteNode;

  if (isScreenDraft(jsonContent)) {
    console.log("ℹ️ Format ScreenDraft détecté. Transformation automatique...");
    siteData = ScreenDraftAdapter.transform(jsonContent);
  } else {
    siteData = jsonContent;
  }
  
  const input: Record<string, string> = {};
  const tempFiles: string[] = [];

  for (const page of siteData.pages) {
    page.content.meta = page.content.meta || {};
    page.content.meta.appName = siteData.meta.appName;
    page.content.style = { ...siteData.style, ...page.content.style };

    if (page.content.meta) {
      if (siteData.layout?.header) page.content.meta.renderedHeader = render(siteData.layout.header);
      if (siteData.layout?.footer) page.content.meta.renderedFooter = render(siteData.layout.footer);
    }

    const html = render(page.content);
    const fileName = `${page.slug}.html`;
    
    // Création d'un dossier temporaire pour le build
    const tempDir = path.resolve(process.cwd(), ".codeforge_tmp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, html);
    
    input[page.slug] = filePath;
    tempFiles.push(tempDir); // On stocke le dossier pour le supprimer à la fin
  }

  try {
    await viteBuild({
      configFile: false,
      root: path.resolve(process.cwd(), ".codeforge_tmp"),
      // On aide Vite à trouver les assets (style.css) qui sont à la racine du projet
      resolve: {
        alias: {
          "/src": path.resolve(process.cwd(), "src"),
        },
      },
      build: {
        outDir: absoluteOutDir,
        emptyOutDir: true,
        rollupOptions: { input },
      },
    });

    if (options.inlineCss) {
      const assetsDir = path.join(absoluteOutDir, "assets");
      if (fs.existsSync(assetsDir)) {
        const cssFiles = fs.readdirSync(assetsDir).filter((f) => f.endsWith(".css"));
        let cssContent = "";
        
        for (const file of cssFiles) {
          cssContent += fs.readFileSync(path.join(assetsDir, file), "utf-8");
        }

        if (cssContent) {
          for (const page of siteData.pages) {
            const htmlPath = path.join(absoluteOutDir, `${page.slug}.html`);
            if (fs.existsSync(htmlPath)) {
              let html = fs.readFileSync(htmlPath, "utf-8");
              // Retire les liens CSS générés par Vite
              html = html.replace(/<link[^>]*rel="stylesheet"[^>]*>/g, "");
              // Injecte le style dans le head
              html = html.replace("</head>", `<style>${cssContent}</style></head>`);
              fs.writeFileSync(htmlPath, html);
            }
          }
        }
        // Cleanup assets directory as everything is inlined
        fs.rmSync(assetsDir, { recursive: true, force: true });
      }
    }

  } finally {
    // Nettoyage récursif du dossier temporaire
    for (const dir of [...new Set(tempFiles)]) {
      if (fs.existsSync(dir)) fs.rmSync(dir, { recursive: true, force: true });
    }
  }
}
