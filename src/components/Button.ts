import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Button. */
export interface ButtonMeta {
  /** Le texte affiché sur le bouton. */
  label: string;
  /** L'URL de destination ou l'action JavaScript à exécuter. */
  action?: string;
}

/** Interface des Design Tokens pour le composant Button. */
export interface ButtonStyles {
  /** Couleur de fond spécifique. */
  "btn-bg"?: string;
  /** Couleur de texte spécifique. */
  "btn-text"?: string;
  /** Alias legacy pour le fond. */
  "bg-color"?: string;
  /** Alias legacy pour le texte. */
  "text-color"?: string;
}

/**
 * @class ButtonBuilder
 * @description Constructeur fluide pour le composant Button.
 */
export class ButtonBuilder extends NodeBuilder<ButtonMeta, ButtonStyles> {
  constructor(id: string) {
    super(id, "Button");
  }
  /** Définit le libellé du bouton. */
  withLabel(label: string): this {
    this.node.meta.label = label;
    return this;
  }
  /** Définit l'action (URL ou code JS). */
  withAction(action: string): this {
    this.node.meta.action = action;
    return this;
  }
}

/**
 * @constant Button
 * @description Composant interactif polyvalent.
 * S'affiche comme un lien (<a>) si l'action ressemble à une URL,
 * ou comme un bouton (<button>) sinon.
 */
export const Button = createComponent({
  name: "Button",
  version: "1.3.0",
  description: "Bouton ou lien interactif.",
  metaSchema: { label: "Texte", action: "URL ou JS" },
  authorizedTokens: ["btn-bg", "btn-text", "bg-color", "text-color"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    const action = meta.action || "";
    const isLink = action.startsWith("/") || action.startsWith("http") || action.endsWith(".html");
    const label = meta.label || "Click me";

    if (isLink)
      return `<a href="${action}" style="${styleVars}" class="btn-base" ${a11yAttrs}>${label}</a>`;
    return `<button type="button" style="${styleVars}" class="btn-base" ${a11yAttrs} onclick="${action}">${label}</button>`;
  },
});
