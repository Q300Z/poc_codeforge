export * from "./types.js";
export * from "./registry.js";
export * from "./renderer.js";
export * from "./setup.js";
export * from "./utils/factory.js";
export * from "./utils/style.js";
export * from "./utils/validator.js";
export * from "./utils/builder.js";

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
  
  const input: Record<string, string> = {};
  const tempFiles: string[] = [];

  for (const page of siteData.pages) {
    page.content.meta = page.content.meta || {};
    page.content.meta.appName = siteData.meta.appName;
    page.content.style = { ...siteData.style, ...page.content.style };

    const children = [];
    if (siteData.layout?.header) children.push(siteData.layout.header);
    if (page.content.children) children.push(...page.content.children);
    if (siteData.layout?.footer) children.push(siteData.layout.footer);
    page.content.children = children;

    if (page.content.meta) {
      if (siteData.layout?.header) page.content.meta.renderedHeader = render(siteData.layout.header);
      if (siteData.layout?.footer) page.content.meta.renderedFooter = render(siteData.layout.footer);
    }

    const html = render(page.content);
    const fileName = `${page.slug}.html`;
    const filePath = path.join(__dirname, "..", fileName);
    
    fs.writeFileSync(filePath, html);
    input[page.slug] = filePath;
    tempFiles.push(filePath);
  }

  try {
    await viteBuild({
      root: path.join(__dirname, ".."),
      build: {
        outDir: absoluteOutDir,
        emptyOutDir: true,
        rollupOptions: { input },
      },
    });
    console.log(`\n✅ Site successfully generated in: ${absoluteOutDir}`);
  } finally {
    for (const file of tempFiles) {
      if (fs.existsSync(file)) fs.unlinkSync(file);
    }
  }
}
