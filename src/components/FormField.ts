import { CSSColor, CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Types d'entrées supportés par le composant FormField. */
export type FormFieldType = "text" | "email" | "password" | "number" | "tel" | "url" | "textarea";

/** Interface des métadonnées pour le composant FormField. */
export interface FormFieldMeta {
  /** Libellé affiché au-dessus du champ. */
  label: string;
  /** Type de champ HTML. */
  type?: FormFieldType;
  /** Texte d'aide affiché à l'intérieur du champ. */
  placeholder?: string;
  /** Nom de l'attribut name pour le formulaire. */
  name?: string;
  /** Indique si le champ est obligatoire. */
  required?: boolean;
}

/** Interface des Design Tokens pour le composant FormField. */
export interface FormFieldStyles {
  /** Couleur de fond du champ. */
  "field-bg"?: CSSColor;
  /** Couleur du texte du libellé. */
  "label-color"?: CSSColor;
  /** Couleur de la bordure. */
  "field-border"?: CSSColor;
  /** Arrondi des angles. */
  "field-radius"?: CSSLength;
}

/**
 * @class FormFieldBuilder
 * @description Constructeur fluide pour le composant FormField.
 */
export class FormFieldBuilder extends NodeBuilder<FormFieldMeta, FormFieldStyles> {
  constructor(id: string) {
    super(id, "FormField");
  }
  /** Définit le libellé du champ. */
  withLabel(label: string): this {
    this.node.meta.label = label;
    return this;
  }
  /** Définit le type de champ. */
  withType(type: FormFieldType): this {
    this.node.meta.type = type;
    return this;
  }
  /** Définit le placeholder. */
  withPlaceholder(placeholder: string): this {
    this.node.meta.placeholder = placeholder;
    return this;
  }
  /** Définit si le champ est requis. */
  withRequired(required: boolean = true): this {
    this.node.meta.required = required;
    return this;
  }
}

/**
 * @constant FormField
 * @description Composant de saisie générique incluant un label et un input/textarea.
 */
export const FormField = createComponent({
  name: "FormField",
  version: "1.0.0",
  description: "Champ de saisie de formulaire accessible.",
  metaSchema: {
    label: { type: "string", description: "Libellé du champ", required: true },
    type: {
      type: "enum",
      description: "Type de champ",
      options: ["text", "email", "password", "number", "tel", "url", "textarea"],
      default: "text",
    },
    placeholder: { type: "string", description: "Texte d'aide" },
    required: { type: "boolean", description: "Champ obligatoire", default: false },
  },
  authorizedTokens: {
    "field-bg": "Couleur de fond",
    "label-color": "Couleur du label",
    "field-border": "Couleur de la bordure",
    "field-radius": "Arrondi",
    "font-size": "Taille de police",
  },
  template: (meta, _children, styleVars, a11yAttrs, id, getStyleAttr, styleVarsDark) => {
    const type = meta.type || "text";
    const label = meta.label || "";
    const placeholder = meta.placeholder || "";
    const required = meta.required ? "required" : "";
    const inputId = `input-${id}`;

    const commonClasses =
      "block w-full px-4 py-3 rounded-lg border border-[var(--field-border,theme(colors.gray.300))] bg-[var(--field-bg,white)] focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";

    const inputHtml =
      type === "textarea"
        ? `<textarea id="${inputId}" class="${commonClasses} min-h-[120px]" placeholder="${placeholder}" ${required}></textarea>`
        : `<input id="${inputId}" type="${type}" class="${commonClasses}" placeholder="${placeholder}" ${required} />`;

    return `
<div class="field-wrapper space-y-2" ${getStyleAttr(styleVars + styleVarsDark)} ${a11yAttrs}>
  <label for="${inputId}" class="block text-sm font-semibold text-[var(--label-color,theme(colors.gray.700))]">
    ${label}${meta.required ? ' <span class="text-red-500">*</span>' : ""}
  </label>
  ${inputHtml}
</div>
    `;
  },
});
