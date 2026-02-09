import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface pour une option de select. */
export interface SelectOption {
  label: string;
  value: string;
}

/** Interface des métadonnées pour le composant Select. */
export interface SelectMeta {
  /** Libellé affiché au-dessus ou à côté du select. */
  label: string;
  /** Liste des options disponibles. */
  options: SelectOption[];
  /** Nom de l'attribut name du select. */
  name: string;
  /** Valeur sélectionnée par défaut. */
  value?: string;
  /** Texte d'aide ou placeholder. */
  placeholder?: string;
}

/** Interface des Design Tokens pour le composant Select. */
export interface SelectStyles {
  /** Couleur de fond du select. */
  "select-bg"?: CSSColor;
  /** Couleur du texte du select. */
  "select-text"?: CSSColor;
  /** Couleur de la bordure. */
  "select-border"?: CSSColor;
  /** Arrondi des angles. */
  "select-radius"?: string | number;
}

/**
 * @class SelectBuilder
 * @description Constructeur fluide pour le composant Select.
 */
export class SelectBuilder extends NodeBuilder<SelectMeta, SelectStyles> {
  constructor(id: string) {
    super(id, "Select");
  }

  /** Définit le libellé du select. */
  withLabel(label: string): this {
    this.node.meta.label = label;
    return this;
  }

  /** Ajoute une option au select. */
  addOption(label: string, value: string): this {
    if (!this.node.meta.options) this.node.meta.options = [];
    this.node.meta.options.push({ label, value });
    return this;
  }

  /** Définit toutes les options du select. */
  withOptions(options: SelectOption[]): this {
    this.node.meta.options = options;
    return this;
  }

  /** Définit le nom du champ. */
  withName(name: string): this {
    this.node.meta.name = name;
    return this;
  }

  /** Définit la valeur par défaut. */
  withValue(value: string): this {
    this.node.meta.value = value;
    return this;
  }
}

/**
 * @constant Select
 * @description Composant de formulaire permettant de choisir une option dans une liste déroulante.
 */
export const Select = createComponent({
  name: "Select",
  version: "1.0.0",
  description: "Liste déroulante accessible avec support des labels.",
  metaSchema: {
    label: {
      type: "string",
      description: "Libellé du champ",
      required: true,
    },
    name: {
      type: "string",
      description: "Nom du champ (attribut name)",
      required: true,
    },
    options: {
      type: "array",
      description: "Liste des options {label, value}",
      required: true,
    },
    value: {
      type: "string",
      description: "Valeur par défaut",
      required: false,
    },
    placeholder: {
      type: "string",
      description: "Option vide affichée par défaut",
      required: false,
    },
  },
  authorizedTokens: {
    "select-bg": "Couleur de fond",
    "select-text": "Couleur du texte",
    "select-border": "Couleur de la bordure",
    "select-radius": "Arrondi des angles",
  },
  template: (meta, _children, styleVars, a11yAttrs, id, getStyleAttr, styleVarsDark) => {
    const options = meta.options || [];
    const selectId = `${id}-select`;
    const placeholderHtml = meta.placeholder
      ? `<option value="" disabled ${!meta.value ? "selected" : ""}>${meta.placeholder}</option>`
      : "";

    const optionsHtml = options

      .map((opt: SelectOption) => {
        const selected = meta.value === opt.value ? " selected" : "";

        return `<option value="${opt.value}"${selected}>${opt.label}</option>`;
      })

      .join("");

    return `
      <div class="select-container" ${getStyleAttr(styleVars + styleVarsDark)} ${a11yAttrs}>
        <style>
          .select-container {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }
          .select-label {
            font-weight: 500;
            color: var(--select-text, #374151);
          }
          .select-base {
            padding: 0.5rem 2.5rem 0.5rem 0.75rem;
            background-color: var(--select-bg, #ffffff);
            color: var(--select-text, #111827);
            border: 1px solid var(--select-border, #d1d5db);
            border-radius: var(--select-radius, 0.375rem);
            font-size: 0.875rem;
            line-height: 1.25rem;
            appearance: none;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
            background-position: right 0.5rem center;
            background-repeat: no-repeat;
            background-size: 1.5em 1.5em;
          }
        </style>
        <label for="${selectId}" class="select-label">${meta.label}</label>
        <select id="${selectId}" name="${meta.name}" class="select-base">
          ${placeholderHtml}${optionsHtml}
        </select>
      </div>
    `;
  },
});
