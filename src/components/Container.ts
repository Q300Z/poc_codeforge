import { createComponent } from "../utils/factory.js";

export const Container = createComponent({
  name: "Container",
  version: "1.1.0",
  description: "Conteneur structurel qui centre son contenu avec une largeur maximale.",
  metaSchema: {
    "container-width": "Largeur maximale du conteneur (ex: 1200px, 80rem).",
  },
  authorizedTokens: [
    "container-width",
    "container-width-lg",
    "position",
    "height",
    "width",
    "left",
    "top",
    "overflow",
  ],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}" 
      class="container-center"
      ${a11yAttrs}
    >
      ${children.join("")}
    </div>
  `,
});
