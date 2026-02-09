import { test } from "vitest";
import { render, setupRegistry } from "../src/index.js";
import { performance } from "perf_hooks";

test("Extreme Stress Test - 50,000 Nodes & 500 Pages", () => {
  setupRegistry();
  console.log("\n🌋 Démarrage de l'EXTREME Stress Test...\n");

  const generateDeepTree = (depth: number): any => {
    if (depth <= 0) return { id: `leaf-${Math.random()}`, type: "Box", meta: { version: "1", createdAt: "" } };
    return {
      id: `node-${depth}`,
      type: "Box",
      meta: { version: "1", createdAt: "" },
      children: [generateDeepTree(depth - 1), generateDeepTree(depth - 1)]
    };
  };

  // 1. Test de profondeur massive
  const largeTree = generateDeepTree(15); // ~65,000 nodes
  const startLarge = performance.now();
  const memoryBefore = process.memoryUsage().heapUsed / 1024 / 1024;
  render(largeTree);
  const memoryAfter = process.memoryUsage().heapUsed / 1024 / 1024;
  const endLarge = performance.now();

  console.log(`🌲 Rendu d'un arbre de ~65,000 nœuds : ${(endLarge - startLarge).toFixed(2)}ms`);
  console.log(`🧠 Consommation mémoire (diff) : ${(memoryAfter - memoryBefore).toFixed(2)} MB`);

  // 2. Test de volume de pages
  const pageCount = 500;
  const smallPage = { id: "page", type: "Box", meta: { version: "1", createdAt: "" }, children: Array(100).fill({ type: "Text", meta: { content: "Stress" } }) };
  
  const startPages = performance.now();
  for (let i = 0; i < pageCount; i++) {
    render(smallPage);
  }
  const endPages = performance.now();
  console.log(`📄 Rendu de ${pageCount} pages (100 nœuds/page) : ${(endPages - startPages).toFixed(2)}ms`);
  console.log(`📊 Moyenne par page : ${((endPages - startPages) / pageCount).toFixed(4)}ms`);

  console.log("\n✅ Extreme Stress Test terminé.\n");
});