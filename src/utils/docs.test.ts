/**
 * @vitest-environment node
 */
import * as fs from "fs";
import * as path from "path";
import { describe, expect, it } from "vitest";

import { generateComponentDocs } from "./docs.js";

describe("Documentation Generator", () => {
  it("should generate markdown files for all components in the registry", () => {
    const testDocsDir = path.join(process.cwd(), "test-docs-gen");

    try {
      generateComponentDocs(testDocsDir);

      // On vérifie que les fichiers essentiels existent
      expect(fs.existsSync(path.join(testDocsDir, "Button.md"))).toBe(true);
      expect(fs.existsSync(path.join(testDocsDir, "Hero.md"))).toBe(true);
      expect(fs.existsSync(path.join(testDocsDir, "AppBar.md"))).toBe(true);

      const buttonDoc = fs.readFileSync(path.join(testDocsDir, "Button.md"), "utf-8");
      expect(buttonDoc).toContain("# 🧱 Composant : Button");
      expect(buttonDoc).toContain("## 📥 Paramètres (meta)");
      expect(buttonDoc).toContain("## 🏗️ Utilitaires de Layout");
      expect(buttonDoc).toContain("```json");
    } finally {
      // Nettoyage
      if (fs.existsSync(testDocsDir)) {
        fs.rmSync(testDocsDir, { recursive: true, force: true });
      }
    }
  });
});
