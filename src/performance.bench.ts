import { bench, describe } from "vitest";
import { render } from "./renderer.js";
import { SiteNode, PageNode } from "./types.js";
import fs from "fs";
import path from "path";

describe("Performance du Rendu (CodeForge)", () => {
  const siteData: SiteNode = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "data/site.json"), "utf-8")
  );

  // On prend la première page pour le test de rendu atomique
  const pageNode = siteData.pages[0].content;

  bench("Rendu d'une page complète (Showcase)", () => {
    render(pageNode);
  });

  bench("Rendu de 100 répétitions (Stress test)", () => {
    for (let i = 0; i < 100; i++) {
      render(pageNode);
    }
  });

  bench("Rendu du site complet (Toutes les pages)", () => {
    siteData.pages.forEach((page: { content: PageNode }) => {
      render(page.content);
    });
  });
});
