import { CSSColor } from "../types.js";
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
  "btn-bg"?: CSSColor;
  /** Couleur de texte spécifique. */
  "btn-text"?: CSSColor;
  /** Alias legacy pour le fond. */
  "bg-color"?: CSSColor;
  /** Alias legacy pour le texte. */
  "text-color"?: CSSColor;
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
  version: "1.2.0",
  description:
    "Bouton interactif supportant plusieurs variantes visuelles et l'accessibilité native.",
  metaSchema: {
    label: {
      type: "string",
      description: "Texte affiché à l'intérieur du bouton",
      required: true,
      default: "Click me",
    },
    variant: {
      type: "enum",
      description: "Style visuel du bouton",
      options: ["primary", "secondary", "outline", "ghost"],
      default: "primary",
    },
    href: {
      type: "string",
      description: "Si présent, transforme le bouton en lien (balise <a>)",
      required: false,
    },
  },
  authorizedTokens: {
    "btn-bg": "Couleur de fond",
    "btn-text": "Couleur du texte",
    "btn-bg-default": "Couleur de fond par défaut",
    "btn-text-default": "Couleur du texte par défaut",
    "btn-radius": "Arrondi des angles",
    "font-size": "Taille de police",
  },
  examples: [
    {
      description: "Création d'un bouton d'action principal avec redirection.",
      builderCode: `const myButton = new ButtonBuilder("btn-001")
  .withLabel("Découvrir l'offre")
  .withVariant("primary")
  .withHref("/offres")
  .withAudioDescription("En savoir plus sur nos offres promotionnelles")
  .build();`,
    },
  ],
  template: (meta, _children, styleVars, a11yAttrs, _id, getStyleAttr, styleVarsDark) => {
    const action = meta.action || "";
    const isLink = action.startsWith("/") || action.startsWith("http") || action.endsWith(".html");
    const label = meta.label || "Click me";

    const combinedStyle = `${styleVars}${styleVarsDark}`;
    const baseClasses = "btn-base dark:bg-[var(--dark-btn-bg,var(--dark-btn-bg-default,#3b82f6))] dark:text-[var(--dark-btn-text,var(--dark-btn-text-default,white))]";

    if (isLink)
      return `<a href="${action}" ${getStyleAttr(combinedStyle)} class="${baseClasses}" ${a11yAttrs}>${label}</a>`;
    return `<button type="button" ${getStyleAttr(combinedStyle)} class="${baseClasses}" ${a11yAttrs} onclick="${action}">${label}</button>`;
  },
});
