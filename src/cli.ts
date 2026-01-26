#!/usr/bin/env node
import { buildSite } from "./index.js";
import fs from "fs";
import path from "path";

function printHelp() {
  console.log(`
🧱 CodeForge CLI - Moteur de rendu JSON → HTML

Usage:
  codeforge <json-path> [output-dir] [options]

Options:
  -w, --watch    Relance le build automatiquement à chaque modification du JSON
  -h, --help     Affiche cette aide
  -v, --version  Affiche la version

Exemple:
  codeforge data/site.json dist-site --watch
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes("-h") || args.includes("--help")) {
    printHelp();
    process.exit(0);
  }

  // Extraction des options
  const isWatch = args.includes("-w") || args.includes("--watch");
  const filteredArgs = args.filter(a => !["-w", "--watch", "-h", "--help"].includes(a));

  if (filteredArgs.length < 1) {
    printHelp();
    process.exit(1);
  }

  const jsonPath = filteredArgs[0];
  const outDir = filteredArgs[1] || "dist-site";
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);

  const runBuild = async () => {
    console.log(`\n[${new Date().toLocaleTimeString()}] 📦 Build en cours : ${jsonPath} -> ${outDir}...`);
    try {
      await buildSite(jsonPath, outDir);
      console.log("✨ Build réussi !");
    } catch (error) {
      console.error("❌ Build failed:", error instanceof Error ? error.message : error);
    }
  };

  // Premier build
  await runBuild();

  if (isWatch) {
    if (!fs.existsSync(absoluteJsonPath)) {
      console.error(`❌ Impossible de surveiller : ${absoluteJsonPath} n'existe pas.`);
      process.exit(1);
    }

    console.log(`👀 Mode Watch activé sur : ${jsonPath}`);
    
    let debounceTimer: NodeJS.Timeout;
    fs.watch(absoluteJsonPath, (event) => {
      if (event === "change") {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(runBuild, 200);
      }
    });
  }
}

main();
