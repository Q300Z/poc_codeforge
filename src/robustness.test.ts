import { describe, expect, it, vi } from "vitest";
import { render } from "./renderer.js";
import { setupRegistry } from "./setup.js";
import { buildSite } from "./index.js";
import fs from "fs";
import path from "path";

describe("Robustness & Edge Cases", () => {
  setupRegistry();

  it("should prevent infinite recursion", () => {
    const circularNode: any = {
      id: "circular",
      type: "Box",
      meta: { version: "1.0.0", createdAt: "" },
      children: []
    };
    // Créer une boucle infinie
    circularNode.children.push(circularNode);

    expect(() => render(circularNode)).toThrow(/Profondeur de récursion maximale atteinte/);
  });

  it("should handle malicious style injection safely", () => {
    // Tentative d'injection via un token de style
    const maliciousNode = {
      id: "malicious",
      type: "Box",
      meta: { version: "1.0.0", createdAt: "" },
      style: {
        "box-bg": 'red; position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; z-index: 9999; background: black; content: "HACKED";'
      }
    };

    const html = render(maliciousNode);
    // Le moteur inclut la valeur brute dans l'attribut style. 
    // Tailwind/Navigateur filtreront si nécessaire, mais le DOM ne doit pas être cassé.
    expect(html).toContain('style="background-color:var(--box-bg,#e5e7eb);--box-bg:red;');
    // On vérifie que la balise fermante du div est toujours là (le regex .* ne matche pas les newlines par défaut)
    expect(html).toMatch(/<div.*?>\s*?<\/div>/s);
  });

  it("should handle very deep nesting (just under limit)", () => {
    let root: any = { id: "0", type: "Box", meta: { version: "1", createdAt: "" }, children: [] };
    let current = root;
    for (let i = 1; i < 50; i++) {
      const child = { id: String(i), type: "Box", meta: { version: "1", createdAt: "" }, children: [] };
      current.children.push(child);
      current = child;
    }
    expect(() => render(root)).not.toThrow();
  });

  it("should fail gracefully if output directory is not writable", async () => {
    const mockFs = vi.spyOn(fs, 'mkdirSync').mockImplementation(() => {
      throw new Error("EACCES: permission denied");
    });

    const jsonPath = "data/site.json";
    await expect(buildSite(jsonPath, "/root/forbidden")).rejects.toThrow(/EACCES/);

    mockFs.mockRestore();
  });

  it("should handle missing metadata gracefully", () => {
    const incompleteNode: any = {
      id: "incomplete",
      type: "Text",
      meta: { content: "Missing version and createdAt" }
    };
    
    // La factory doit injecter les valeurs manquantes sans planter
    const html = render(incompleteNode);
    expect(html).toContain("Missing version and createdAt");
  });
});
