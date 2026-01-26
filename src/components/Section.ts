import { createComponent } from "../utils/factory.js";

export const Section = createComponent({
  name: "Section",
  description: "Unité structurelle horizontale pleine largeur pour découper la page.",
  metaSchema: {
    "section-bg": "Couleur de fond de la section.",
    "section-py": "Padding vertical de la section.",
  },
  authorizedTokens: [
    "section-bg",
    "section-py",
    "section-py-md",
    "height",
    "min-height",
    "overflow",
    "overflow-x",
    "overflow-y",
  ],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <section 
      style="${styleVars}" 
      class="section-pad bg-[var(--section-bg,transparent)]"
      ${a11yAttrs}
    >
      ${children.join("")}
    </section>
  `,
});
