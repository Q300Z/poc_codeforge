export * from "./types.js";
export * from "./registry.js";
export * from "./renderer.js";
export * from "./setup.js";
export * from "./utils/factory.js";
export * from "./utils/style.js";
export * from "./utils/validator.js";

import { build as viteBuild } from "vite";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { setupRegistry } from "./setup.js";
import { render } from "./renderer.js";
import { SiteNode } from "./types.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function buildSite(jsonPath: string, outDir: string = "generated") {
  setupRegistry();
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);
  const absoluteOutDir = path.resolve(process.cwd(), outDir);
  
  if (!fs.existsSync(absoluteJsonPath)) {
    throw new Error(`JSON file not found: ${absoluteJsonPath}`);
  }

  const siteData: SiteNode = JSON.parse(fs.readFileSync(absoluteJsonPath, "utf-8"));
  
  // 1. Préparation des entrées pour Rollup
  const input: Record<string, string> = {};
  const tempFiles: string[] = [];

  for (const page of siteData.pages) {
    // On s'assure que meta existe
    page.content.meta = page.content.meta || {};
    // On injecte les métadonnées globales dans chaque page si besoin
    page.content.meta.appName = siteData.meta.appName;
    
    // On peut aussi fusionner les styles globaux du site avec ceux de la page
    page.content.style = { ...siteData.style, ...page.content.style };

    const html = render(page.content);
    const fileName = `${page.slug}.html`;
    const filePath = path.join(__dirname, "..", fileName);
    
    fs.writeFileSync(filePath, html);
    input[page.slug] = filePath;
    tempFiles.push(filePath);
  }

  // 2. Lancement du build Vite
  try {
    await viteBuild({
      root: path.join(__dirname, ".."),
      build: {
        outDir: absoluteOutDir,
        emptyOutDir: true,
        rollupOptions: {
          input,
        },
      },
    });
    console.log(`\n✅ Multi-page site successfully generated in: ${absoluteOutDir}`);
  } finally {
    // Nettoyage des fichiers temporaires
    for (const file of tempFiles) {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  }
}
