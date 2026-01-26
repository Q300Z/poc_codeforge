import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

import { render } from "./renderer.js";
import { setupRegistry } from "./setup.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function runGenerator(jsonPath: string, outputPath: string) {
  setupRegistry();
  const pageData = JSON.parse(fs.readFileSync(jsonPath, "utf-8"));
  const html = render(pageData);
  fs.writeFileSync(outputPath, html);
  return html;
}

if (process.argv[1] === __filename) {
  try {
    const jsonPath = path.join(__dirname, "../data/page.json");
    const outputPath = path.join(__dirname, "../output.html");
    const html = runGenerator(jsonPath, outputPath);
    console.log("--- HTML GÉNÉRÉ ---");
    // console.log(html);
    console.log(`\nPage sauvegardée dans : ${outputPath}`);
  } catch (error) {
    console.error("Erreur lors du rendu :", error);
  }
}
