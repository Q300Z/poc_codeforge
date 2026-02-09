#!/usr/bin/env node
import { buildSite } from "./index.js";
import fs from "fs";
import path from "path";

export function printHelp() {
  console.log(`
🧱 CodeForge CLI - Générateur de Site Statique

Usage:
  codeforge <json-path> [output-dir] [options]

Options:
  -w, --watch    Relance le build automatiquement à chaque modification du JSON
  -i, --inline   Injecte le CSS directement dans les fichiers HTML (mode autonome)
  --no-minify    Désactive la minification du HTML
  -h, --help     Affiche cette aide
  -v, --version  Affiche la version

Exemple:
  codeforge data/site.json dist-static
  codeforge data/site.json dist-static --inline
`);
}

export async function runCli(args: string[]) {
  if (args.includes("-h") || args.includes("--help")) {
    printHelp();
    return;
  }

  if (args.includes("-v") || args.includes("--version")) {
    const pkg = JSON.parse(fs.readFileSync(path.resolve(process.cwd(), "package.json"), "utf-8"));
    console.log(`v${pkg.version}`);
    return;
  }

  // Extraction des options
  const isWatch = args.includes("-w") || args.includes("--watch");
  const isInline = args.includes("-i") || args.includes("--inline");
  const isNoMinify = args.includes("--no-minify");
  const filteredArgs = args.filter(a => !["-w", "--watch", "-i", "--inline", "--no-minify", "-h", "--help"].includes(a));

  if (filteredArgs.length < 1) {
    printHelp();
    throw new Error("Missing arguments");
  }

  const jsonPath = filteredArgs[0];
  const outDir = filteredArgs[1] || "dist-static";
  const absoluteJsonPath = path.resolve(process.cwd(), jsonPath);

  const runBuild = async () => {
    console.log(`\n[${new Date().toLocaleTimeString()}] 📦 Build en cours : ${jsonPath} -> ${outDir}...`);
    try {
      const { buildSite } = await import("./index.js");
      await buildSite(jsonPath, outDir, { inline: isInline, minify: !isNoMinify });
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

// Execution seulement si appelé directement (pas importé)
import { fileURLToPath } from "url";
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runCli(process.argv.slice(2)).catch(() => process.exit(1));
}
