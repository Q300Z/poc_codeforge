import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Grid. */
export interface GridMeta {
  /** Nombre de colonnes sur desktop (1-12). */
  cols?: number;
  /** Espacement entre les cellules (0-16). */
  gap?: number;
}

/** Interface des Design Tokens pour le composant Grid. */
export interface GridStyles {
  /** Espacement personnalisé. */
  "grid-gap"?: string | number;
  /** Couleur de fond du conteneur de grille. */
  "grid-bg"?: string;
}

/**
 * @class GridBuilder
 * @description Constructeur fluide pour le système de grille.
 */
export class GridBuilder extends NodeBuilder<GridMeta, GridStyles> {
  constructor(id: string) {
    super(id, "Grid");
  }
  /** Définit le nombre de colonnes sur desktop. */
  withCols(cols: number): this {
    this.node.meta.cols = cols;
    return this;
  }
  /** Définit l'espacement. */
  withGap(gap: number): this {
    this.node.meta.gap = gap;
    return this;
  }
}

const COLUMN_MAP: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

/**
 * @constant Grid
 * @description Système de grille responsive Mobile-First utilisant CSS Grid.
 */
export const Grid = createComponent({
  name: "Grid",
  version: "1.1.0",
  description: "Système de grille responsive (1 à 12 colonnes sur desktop, 1 colonne sur mobile).",
  metaSchema: {
    cols: {
      type: "number",
      description: "Nombre de colonnes sur desktop (1, 2, 3, 4, 5, 6 ou 12)",
      default: 2,
    },
    gap: {
      type: "number",
      description: "Espacement entre les cellules (échelle Tailwind 0-16)",
      default: 8,
    },
  },
  authorizedTokens: {
    "grid-gap": "Espacement personnalisé",
    "grid-bg": "Couleur de fond du conteneur de grille",
  },
  examples: [
    {
      description: "Grille de 3 colonnes pour afficher des cartes de services.",
      builderCode: `const grid = new GridBuilder("services-grid")
  .withCols(3)
  .withGap(10)
  .addChild(card1)
  .addChild(card2)
  .addChild(card3)
  .build();`,
    },
  ],
  template: (meta: Record<string, any>, children, styleVars, a11yAttrs) => {
    const colClass = COLUMN_MAP[meta.cols as number] || "md:grid-cols-2";
    return `
      <section 
        style="${styleVars}" 
        class="grid grid-cols-1 ${colClass} gap-${meta.gap || 8} w-full max-w-7xl mx-auto px-4 py-8 bg-[var(--grid-bg,transparent)]"
        ${a11yAttrs}
      >
        ${children.join("")}
      </section>`;
  },
});
