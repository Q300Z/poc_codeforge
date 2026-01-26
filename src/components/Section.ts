import { createComponent } from "../utils/factory.js";

export const Section = createComponent({
  name: "Section",
  version: "1.1.0",
  description: "Unité structurelle horizontale pleine largeur pour découper la page.",
  metaSchema: {
    "section-bg": "Couleur de fond de la section.",
    "section-py": "Padding vertical de la section.",
  },
  authorizedTokens: {
    "section-bg": "Couleur de fond spécifique à cette section.",
    "section-py": "Padding vertical personnalisé.",
  },
  template: (_meta: Record<string, any>, children, styleVars, a11yAttrs) => `
    <section 
      style="${styleVars}" 
      class="section-pad bg-[var(--section-bg,transparent)]"
      ${a11yAttrs}
    >
      ${children.join("")}
    </section>
  `,
});
