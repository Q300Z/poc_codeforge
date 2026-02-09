import fs from "fs";
import path from "path";
import { describe, expect, it } from "vitest";

import { registry } from "../registry.js";
import { setupRegistry } from "../setup.js";

describe("Validation de la structure de Documentation", () => {
  setupRegistry();

  const componentsDir = "./src/components";
  const docsDir = "./docs/components";

  // Liste des sections H2 obligatoires (avec leurs emojis)
  const REQUIRED_SECTIONS = [
    "🎯 Objectif",
    "⚙️ Propriétés (Meta)",
    "🎨 Design Tokens (Style)",
    "🛠 Déclaration avec Builder",
    "📄 Déclaration JSON",
    "🌐 Sortie HTML",
  ];

  // On récupère la liste des composants réels (fichiers .ts)
  const componentFiles = fs
    .readdirSync(componentsDir)
    .filter((f) => f.endsWith(".ts") && !f.endsWith(".test.ts") && f !== "Layout.ts");

  componentFiles.forEach((file) => {
    const componentName = file.replace(".ts", "");
    const docPath = path.join(docsDir, `${componentName}.md`);

    describe(`Composant: ${componentName}`, () => {
      it(`doit avoir un fichier de documentation : ${componentName}.md`, () => {
        expect(fs.existsSync(docPath), `Fichier manquant : ${docPath}`).toBe(true);
      });

      if (fs.existsSync(docPath)) {
        const content = fs.readFileSync(docPath, "utf-8");

        it("doit avoir un titre principal (H1)", () => {
          expect(content.startsWith("# ")).toBe(true);
        });

        REQUIRED_SECTIONS.forEach((section) => {
          it(`doit contenir la section : ## ${section}`, () => {
            expect(content.includes(`## ${section}`)).toBe(true);
          });
        });

        it("chaque section doit avoir du contenu (pas de section vide)", () => {
          const sectionsFound = content.split("## ");
          sectionsFound.shift(); // Retire le H1
          sectionsFound.forEach((s) => {
            // On vérifie qu'il y a plus que juste le titre de la section
            const lines = s.split("\n").filter((l) => l.trim() !== "");
            expect(
              lines.length,
              `La section "${s.split("\n")[0]}" semble vide dans ${componentName}.md`
            ).toBeGreaterThan(1);
          });
        });
      }
    });
  });

  it("chaque composant dans le registry doit être documenté dans le code via createComponent", () => {
    Object.entries(registry).forEach(([name, component]) => {
      const doc = (component as any).doc;
      expect(
        doc,
        `Le composant ${name} n'a pas de bloc 'doc' dans son createComponent`
      ).toBeDefined();
      expect(doc.description?.length).toBeGreaterThan(10);
    });
  });
});
