import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Table. */
export interface TableMeta {
  /** Les en-têtes du tableau. */
  headers: string[];
  /** Les données des lignes du tableau. */
  rows: string[][];
  /** Légende du tableau (A11y). */
  caption?: string;
}

/** Interface des Design Tokens pour le composant Table. */
export interface TableStyles {
  /** Couleur de la bordure du tableau. */
  "table-border"?: CSSColor;
  /** Couleur de fond des en-têtes. */
  "table-header-bg"?: CSSColor;
  /** Couleur du texte des en-têtes. */
  "table-header-text"?: CSSColor;
  /** Couleur de fond des lignes paires (zebra-striping). */
  "table-row-even-bg"?: CSSColor;
}

/**
 * @class TableBuilder
 * @description Constructeur fluide pour le composant Table.
 */
export class TableBuilder extends NodeBuilder<TableMeta, TableStyles> {
  constructor(id: string) {
    super(id, "Table");
  }

  /** Définit les en-têtes du tableau. */
  withHeaders(headers: string[]): this {
    this.node.meta.headers = headers;
    return this;
  }

  /** Définit les lignes du tableau. */
  withRows(rows: string[][]): this {
    this.node.meta.rows = rows;
    return this;
  }

  /** Définit la légende du tableau. */
  withCaption(caption: string): this {
    this.node.meta.caption = caption;
    return this;
  }
}

/**
 * @constant Table
 * @description Composant permettant d'afficher des données tabulaires de manière sémantique et accessible.
 */
export const Table = createComponent({
  name: "Table",
  version: "1.0.0",
  description: "Tableau de données sémantique avec support de l'accessibilité.",
  metaSchema: {
    headers: {
      type: "array",
      description: "Liste des libellés d'en-tête",
      required: true,
    },
    rows: {
      type: "array",
      description: "Matrice de données (lignes et colonnes)",
      required: true,
    },
    caption: {
      type: "string",
      description: "Description courte du contenu du tableau",
      required: false,
    },
  },
  authorizedTokens: {
    "table-border": "Couleur de la bordure",
    "table-header-bg": "Couleur de fond de l'en-tête",
    "table-header-text": "Couleur du texte de l'en-tête",
    "table-row-even-bg": "Couleur de fond des lignes paires",
  },
  template: (meta, _children, styleVars, a11yAttrs) => {
    const headers = meta.headers || [];
    const rows = meta.rows || [];
    const caption = meta.caption ? `<caption>${meta.caption}</caption>` : "";

    const headerHtml = headers.length
      ? `<thead>
          <tr class="table-header-row">
            ${headers.map((h: string) => `<th scope="col" class="table-header-cell">${h}</th>`).join("")}
          </tr>
        </thead>`
      : "";

    const rowsHtml = rows
      .map(
        (row: string[]) => `
        <tr class="table-row">
          ${row.map((cell: string) => `<td class="table-cell">${cell}</td>`).join("")}
        </tr>`
      )
      .join("");

    return `
      <div class="table-container" style="${styleVars}" ${a11yAttrs}>
        <style>
          .table-base {
            width: 100%;
            border-collapse: collapse;
            border: 1px solid var(--table-border, #e5e7eb);
          }
          .table-header-cell, .table-cell {
            border: 1px solid var(--table-border, #e5e7eb);
            padding: 1rem;
            text-align: left;
          }
          .table-header-cell {
            background-color: var(--table-header-bg, #f3f4f6);
            color: var(--table-header-text, #111827);
            font-weight: 600;
          }
          .table-row:nth-child(even) {
            background-color: var(--table-row-even-bg, transparent);
          }
        </style>
        <table class="table-base">
          ${caption}
          ${headerHtml}
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </div>
    `;
  },
});
