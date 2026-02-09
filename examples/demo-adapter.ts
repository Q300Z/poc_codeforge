import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { ScreenDraftAdapter, ScreenDraftData } from "../src/adapter/screendraft.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.resolve(__dirname, "../data/screendraft-data.json");
const outputPath = path.resolve(__dirname, "../data/site-from-screendraft.json");

if (!fs.existsSync(inputPath)) {
  console.error(`❌ Fichier d'entrée introuvable : ${inputPath}`);
  process.exit(1);
}

const rawData = fs.readFileSync(inputPath, "utf-8");
const screenDraftData: ScreenDraftData = JSON.parse(rawData);

console.log("🔄 Transformation des données ScreenDraft...");
const codeForgeSite = ScreenDraftAdapter.transform(screenDraftData);

fs.writeFileSync(outputPath, JSON.stringify(codeForgeSite, null, 2));
console.log(`✅ Site généré avec succès : ${outputPath}`);
