import { test } from "vitest";
import { render, setupRegistry } from "../src/index.js";
import { SiteNode, PageNode } from "../src/types.js";
import fs from "fs";
import path from "path";
import { performance } from "perf_hooks";

test("Benchmark de performance détaillé", () => {
  setupRegistry();
  console.log("\n🚀 Démarrage du benchmark de performance...\n");

  const siteData: SiteNode = JSON.parse(
    fs.readFileSync(path.resolve(process.cwd(), "data/site.json"), "utf-8")
  );

  const iterations = 1000;
  const pageNode = siteData.pages[0].content;

  // Warmup
  render(pageNode);

  // 1. Benchmark Rendu Unique
  const startSingle = performance.now();
  render(pageNode);
  const endSingle = performance.now();
  console.log(`⏱️ Rendu d'une page (1000 lignes JSON) : ${(endSingle - startSingle).toFixed(4)}ms`);

  // 2. Benchmark Stress Test (1000 rendus)
  const startStress = performance.now();
  for (let i = 0; i < iterations; i++) {
    render(pageNode);
  }
  const endStress = performance.now();
  const totalStress = endStress - startStress;
  console.log(`🔥 Stress Test (${iterations} rendus) : ${totalStress.toFixed(2)}ms`);
  console.log(`📊 Moyenne par rendu : ${(totalStress / iterations).toFixed(4)}ms`);

  // 3. Benchmark Site Complet
  const startSite = performance.now();
  siteData.pages.forEach((page: { content: PageNode }) => render(page.content));
  const endSite = performance.now();
  console.log(`🌐 Rendu du site complet (${siteData.pages.length} pages) : ${(endSite - startSite).toFixed(4)}ms`);

  console.log("\n✅ Benchmark terminé.\n");
});