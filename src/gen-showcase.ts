import { buildSite } from "./index.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generate() {
  const jsonPath = path.join(__dirname, "../data/site.json");
  const outDir = path.join(__dirname, "../generated");

  console.log("🚀 Generating CodeForge Showcase for E2E tests...");
  
  try {
    await buildSite(jsonPath, outDir);
    console.log("✨ Showcase generated successfully!");
  } catch (error) {
    console.error("❌ Generation failed:", error);
    process.exit(1);
  }
}

generate();
