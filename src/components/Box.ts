import { createComponent } from "../utils/factory.js";

export const Box = createComponent({
  name: "Box",
  version: "1.1.0",
  description:
    "Un composant de structure simple pour afficher des blocs de couleur ou servir de placeholder.",
  metaSchema: {
    "bg-color": "Couleur de fond (ex: #000, red, var(--token)).",
    width: "Largeur explicite.",
    height: "Hauteur explicite.",
    "border-radius": "Rayon de bordure.",
  },
  authorizedTokens: {
    "bg-color": "Couleur de fond.",
    width: "Largeur.",
    height: "Hauteur.",
    "border-radius": "Rayon de bordure.",
    "flex-shrink": "Capacité à se rétrécir.",
  },
  template: (_meta: Record<string, any>, _children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}; flex-shrink: var(--flex-shrink, 1);" 
      class="bg-[var(--bg-color,#e5e7eb)] w-[var(--width,100%)] h-[var(--height,100px)] rounded-[var(--border-radius,0.5rem)]"
      ${a11yAttrs}
    ></div>
  `,
});
