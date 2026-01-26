import { createComponent } from "../utils/factory.js";

export const Title = createComponent({
  name: "Title",
  version: "1.1.0",
  description: "Un composant de titre sémantique supportant les niveaux H1 à H6.",
  metaSchema: {
    content: "Le texte du titre.",
    level: "Niveau du titre (1 à 6). Défaut : 1.",
  },
  authorizedTokens: {
    "font-size": "Taille de la police.",
    "text-color": "Couleur du texte.",
    "bg-color": "Couleur de fond du bloc.",
  },
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const level = Math.min(Math.max(Number(meta.level) || 1, 1), 6);
    const tag = `h${level}`;

    return `
      <${tag} 
        style="${styleVars}" 
        class="text-[var(--text-color,inherit)] bg-[var(--bg-color,transparent)] font-bold leading-tight"
        style="font-size: var(--font-size, ${3 - level * 0.2}rem);"
        ${a11yAttrs}
      >
        ${meta.content || ""}
      </${tag}>
    `;
  },
});
