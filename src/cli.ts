#!/usr/bin/env node
import { buildSite } from "./index.js";
import path from "path";

async function main() {
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log("Usage: render-engine <json-path> [output-dir]");
    process.exit(1);
  }

  const jsonPath = args[0] as string;
  const outDir = (args[1] as string) || "dist-site";

  try {
    await buildSite(jsonPath, outDir);
  } catch (error) {
    console.error("❌ Build failed:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
