import { CSSColor, CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Text. */
export interface TextMeta {
  /** Le contenu textuel brut. */
  content: string;
  /** La balise HTML à utiliser pour le rendu (p, span, div). */
  tag?: "p" | "span" | "div";
}

/** Interface des Design Tokens pour le composant Text. */
export interface TextStyles {
  /** Taille de police personnalisée. */
  "font-size"?: CSSLength;
  /** Couleur du texte. */
  "text-color"?: CSSColor;
  /** Hauteur de ligne (multiplicateur ou unité). */
  "line-height"?: number | string;
}

/**
 * @class TextBuilder
 * @description Constructeur fluide pour les blocs de texte et paragraphes.
 */
export class TextBuilder extends NodeBuilder<TextMeta, TextStyles> {
  constructor(id: string) {
    super(id, "Text");
  }
  /** Définit le contenu textuel. */
  withContent(content: string): this {
    this.node.meta.content = content;
    return this;
  }
  /** Définit la balise HTML (p, span, div). */
  withTag(tag: TextMeta["tag"]): this {
    this.node.meta.tag = tag;
    return this;
  }
}

/**
 * @constant Text
 * @description Composant utilitaire pour le texte courant.
 */
export const Text = createComponent({
  name: "Text",
  version: "1.0.0",
  description:
    "Composant de base pour l'affichage de texte courant, paragraphes ou spans avec support typographique.",
  authorizedTokens: ["font-size", "text-color", "line-height"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, _id, getStyleAttr) => {
    const tag = meta.tag || "p";
    return `
      <${tag} 
        ${getStyleAttr(styleVars)} 
        class="text-[var(--text-color,inherit)] leading-[var(--line-height,1.6)] text-[var(--font-size,1.125rem)]"
        ${a11yAttrs}
      >
        ${meta.content || ""}
      </${tag}>
    `;
  },
});
