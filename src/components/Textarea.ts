import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Textarea. */
export interface TextareaMeta {
  /** Libellé affiché au-dessus de la zone de texte. */
  label: string;
  /** Nom de l'attribut name. */
  name: string;
  /** Valeur par défaut. */
  value?: string;
  /** Texte d'aide (placeholder). */
  placeholder?: string;
  /** Nombre de lignes visibles. */
  rows?: number;
}

/** Interface des Design Tokens pour le composant Textarea. */
export interface TextareaStyles {
  /** Couleur de fond. */
  "textarea-bg"?: CSSColor;
  /** Couleur du texte. */
  "textarea-text"?: CSSColor;
  /** Couleur de la bordure. */
  "textarea-border"?: CSSColor;
  /** Arrondi des angles. */
  "textarea-radius"?: string | number;
}

/**
 * @class TextareaBuilder
 * @description Constructeur fluide pour le composant Textarea.
 */
export class TextareaBuilder extends NodeBuilder<TextareaMeta, TextareaStyles> {
  constructor(id: string) {
    super(id, "Textarea");
  }

  withLabel(label: string): this {
    this.node.meta.label = label;
    return this;
  }

  withName(name: string): this {
    this.node.meta.name = name;
    return this;
  }

  withPlaceholder(placeholder: string): this {
    this.node.meta.placeholder = placeholder;
    return this;
  }

  withRows(rows: number): this {
    this.node.meta.rows = rows;
    return this;
  }

  withValue(value: string): this {
    this.node.meta.value = value;
    return this;
  }
}

/**
 * @constant Textarea
 * @description Zone de saisie de texte multi-lignes accessible.
 */
export const Textarea = createComponent({
  name: "Textarea",
  version: "1.0.0",
  description: "Zone de saisie multi-lignes accessible.",
  metaSchema: {
    label: { type: "string", description: "Libellé", required: true },
    name: { type: "string", description: "Nom du champ", required: true },
    placeholder: { type: "string", description: "Texte d'aide", required: false },
    rows: { type: "number", description: "Nombre de lignes", default: 4 },
    value: { type: "string", description: "Valeur par défaut", required: false },
  },
  authorizedTokens: {
    "textarea-bg": "Couleur de fond",
    "textarea-text": "Couleur du texte",
    "textarea-border": "Couleur de la bordure",
    "textarea-radius": "Arrondi des angles",
  },
  template: (meta, _children, styleVars, a11yAttrs, id, getStyleAttr, _styleVarsDark) => {
    const textareaId = `${id}-textarea`;
    const rows = meta.rows || 4;
    const value = meta.value || "";

    return `
      <div class="textarea-container" ${getStyleAttr(styleVars + styleVarsDark)} ${a11yAttrs}>
        <style>
          .textarea-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .textarea-label {
            font-weight: 500;
            color: var(--textarea-text, #374151);
          }
          .textarea-base {
            padding: 0.5rem 0.75rem;
            background-color: var(--textarea-bg, #ffffff); color: var(--textarea-text, #111827);
          .dark textarea { background-color: var(--dark-textarea-bg, #1f2937); color: var(--dark-textarea-text, #f9fafb); border-color: var(--dark-textarea-border, #374151); }
            color: var(--textarea-text, #111827);
            border: 1px solid var(--textarea-border, #d1d5db);
            border-radius: var(--textarea-radius, 0.375rem);
            font-size: 0.875rem;
            line-height: 1.25rem;
            min-height: 100px;
            resize: vertical;
          }
        </style>
        <label for="${textareaId}" class="textarea-label">${meta.label}</label>
        <textarea id="${textareaId}" name="${meta.name}" rows="${rows}" placeholder="${meta.placeholder || ""}" class="textarea-base">${value}</textarea>
      </div>
    `;
  },
});
