import * as fs from "fs";
import * as path from "path";

import { registry } from "../registry.js";
import { setupRegistry } from "../setup.js";
import { DocumentedComponent } from "./factory.js";
import { LAYOUT_UTILITIES } from "./validator.js";

export function generateComponentDocs(outputDir: string = "docs/components") {
  setupRegistry();

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const components = Object.entries(registry) as [string, DocumentedComponent][];
  const componentLinks: string[] = [];

  for (const [, comp] of components) {
    if (!comp.doc) continue;

    const { name, description, metaSchema, authorizedTokens } = comp.doc;
    // Lien relatif vers le dossier components/
    componentLinks.push("- [" + name + "](./components/" + name + ".md)");

    let markdown = "# 🧱 Composant : " + name + "\n\n" + description + "\n\n";

    if (Object.keys(metaSchema).length > 0) {
      markdown += "## 📥 Paramètres (meta)\n";
      markdown += "Ces champs doivent être placés dans l'objet `meta` du JSON.\n\n";
      markdown += "| Champ | Description |\n| :--- | :--- |\n";
      for (const key in metaSchema) {
        markdown += "| `" + key + "` | " + metaSchema[key] + " |\n";
      }
      markdown += "\n";
    }

    if (Object.keys(authorizedTokens).length > 0) {
      markdown += "## 🎨 Design Tokens (style)\n";
      markdown += "Ces jetons sont spécifiques à ce composant.\n\n";
      markdown += "| Token | Description |\n| :--- | :--- |\n";
      for (const token in authorizedTokens) {
        markdown += "| `--" + token + "` | " + authorizedTokens[token] + " |\n";
      }
      markdown += "\n";
    }

    markdown += "## 🏗️ Utilitaires de Layout\n";
    markdown += "Ce composant supporte également tous les utilitaires de mise en page globaux :\n";
    markdown += "`" + LAYOUT_UTILITIES.join("`, `") + "`.\n\n";

    markdown += "## 📄 Exemple JSON\n";
    markdown += "```json\n";
    markdown += "{\n";
    markdown += '  "id": "' + name.toLowerCase() + '-1",\n';
    markdown += '  "type": "' + name + '",\n';
    markdown += '  "meta": {\n';

    const keys = Object.keys(metaSchema);
    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      let defaultValue = "...";
      if (key === "direction") defaultValue = "vertical";
      if (key === "align" || key === "justify") defaultValue = "center";
      if (key === "cols") defaultValue = "3";
      if (key === "gap") defaultValue = "6";
      markdown +=
        '    "' + key + '": "' + defaultValue + '"' + (i < keys.length - 1 ? "," : "") + "\n";
    }

    markdown += "  },\n";
    markdown += '  "style": {\n    "width": "100%"\n  }\n';
    markdown += "}\n";
    markdown += "```";

    fs.writeFileSync(path.join(outputDir, name + ".md"), markdown.trim());
  }

  // Génération de l'index dans docs/README.md (pas à la racine)
  let indexMarkdown = "# 📚 Bibliothèque de Composants\n\n";
  indexMarkdown += "Bienvenue dans la documentation technique des composants de CodeForge.\n\n";
  indexMarkdown += "## 🧱 Liste des Composants\n";
  indexMarkdown += componentLinks.sort().join("\n") + "\n\n";
  indexMarkdown += "---\n*Généré automatiquement par CodeForge.*";

  const indexPath = path.join(outputDir, "..", "README.md");
  fs.writeFileSync(indexPath, indexMarkdown.trim());

  // eslint-disable-next-line no-console
  console.log("\n📚 Documentation generated in: " + outputDir);
}
