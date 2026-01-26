import { createComponent } from "../utils/factory.js";

export const Text = createComponent({
  name: "Text",
  version: "1.0.0",
  description: "Composant pour les blocs de texte et paragraphes.",
  metaSchema: {
    content: "Le contenu textuel.",
    tag: "Balise HTML à utiliser (p, span, div). Défaut : p.",
  },
  authorizedTokens: {
    "font-size": "Taille de la police.",
    "text-color": "Couleur du texte.",
    "line-height": "Hauteur de ligne.",
  },
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const tag = meta.tag || "p";
    return `
      <${tag} 
        style="${styleVars}" 
        class="text-[var(--text-color,inherit)] leading-[var(--line-height,1.5)]"
        style="font-size: var(--font-size, 1rem);"
        ${a11yAttrs}
      >
        ${meta.content || ""}
      </${tag}>
    `;
  },
});
