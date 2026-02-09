import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Form. */
export interface FormMeta {
  /** Texte affiché sur le bouton de soumission. */
  buttonText?: string;
  /** URL de destination des données. */
  action?: string;
  /** Méthode HTTP (POST ou GET). */
  method?: "POST" | "GET";
}

/** Interface des Design Tokens pour le composant Form. */
export interface FormStyles {
  /** Couleur de fond du formulaire. */
  "form-bg"?: CSSColor;
  /** Couleur de fond du bouton de soumission. */
  "form-btn-bg"?: CSSColor;
}

/**
 * @class FormBuilder
 * @description Constructeur fluide pour le composant Form.
 */
export class FormBuilder extends NodeBuilder<FormMeta, FormStyles> {
  constructor(id: string) {
    super(id, "Form");
  }
  /** Définit le texte du bouton de validation. */
  withButtonText(text: string): this {
    this.node.meta.buttonText = text;
    return this;
  }
  /** Définit l'action du formulaire. */
  withAction(action: string): this {
    this.node.meta.action = action;
    return this;
  }
}

/**
 * @constant Form
 * @description Conteneur de formulaire gérant les champs et la soumission.
 */
export const Form = createComponent({
  name: "Form",
  version: "1.0.0",
  description: "Conteneur de formulaire stylisé.",
  metaSchema: {
    buttonText: { type: "string", description: "Texte du bouton", default: "Envoyer" },
    action: { type: "string", description: "URL de soumission" },
    method: {
      type: "enum",
      description: "Méthode HTTP",
      options: ["POST", "GET"],
      default: "POST",
    },
  },
  authorizedTokens: {
    "form-bg": "Couleur de fond",
    "form-btn-bg": "Couleur du bouton",
  },
  template: (meta, children, styleVars, a11yAttrs, _id, getStyleAttr, _styleVarsDark) => {
    const buttonText = meta.buttonText || "Envoyer";
    const action = meta.action || "#";
    const method = meta.method || "POST";

    return `
<form action="${action}" method="${method}" class="form-base p-8 space-y-6 rounded-2xl shadow-sm bg-[var(--form-bg,white)] dark:bg-[var(--dark-form-bg,#1f2937)]" ${getStyleAttr(styleVars + styleVarsDark)} ${a11yAttrs}>
  <div class="form-fields space-y-4">
    ${children.join("")}
  </div>
  <div class="form-actions pt-4">
    <button type="submit" class="w-full btn-base" style="--btn-bg: var(--form-btn-bg, theme(colors.blue.600))">
      ${buttonText}
    </button>
  </div>
</form>
    `;
  },
});
