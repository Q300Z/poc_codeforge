import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Title. */
export interface TitleMeta {
  /** Le texte du titre. */
  content: string;
  /** Niveau sémantique (1=H1, 2=H2, ..., 6=H6). Défaut : 1. */
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

/** Interface des Design Tokens pour le composant Title. */
export interface TitleStyles {
  /** Taille de police personnalisée. */
  "font-size"?: string | number;
  /** Couleur du texte. */
  "text-color"?: string;
  /** Couleur de fond du bloc de titre. */
  "bg-color"?: string;
}

/**
 * @class TitleBuilder
 * @description Constructeur fluide pour les titres sémantiques (H1-H6).
 */
export class TitleBuilder extends NodeBuilder<TitleMeta, TitleStyles> {
  constructor(id: string) {
    super(id, "Title");
  }
  /** Définit le contenu textuel. */
  withContent(content: string): this {
    this.node.meta.content = content;
    return this;
  }
  /** Définit le niveau HTML (1 pour <h1>, etc.). */
  withLevel(level: TitleMeta["level"]): this {
    this.node.meta.level = level;
    return this;
  }
}

/**
 * @constant Title
 * @description Composant de titre sémantique.
 * Il gère automatiquement la hiérarchie visuelle et l'accessibilité.
 */
export const Title = createComponent({
  name: "Title",
  version: "1.1.0",
  authorizedTokens: ["font-size", "text-color", "bg-color"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const level = Math.min(Math.max(Number(meta.level) || 1, 1), 6);
    const tag = `h${level}`;
    const defaultSizes = ["3.75rem", "3rem", "2.25rem", "1.875rem", "1.5rem", "1.25rem"];
    const defaultSize = defaultSizes[level - 1];

    return `
      <${tag} 
        style="${styleVars} font-size: var(--font-size, ${defaultSize}); font-weight: 800;" 
        class="text-[var(--text-color,inherit)] bg-[var(--bg-color,transparent)] tracking-tight leading-tight m-0"
        ${a11yAttrs}
      >
        ${meta.content || ""}
      </${tag}>
    `;
  },
});
