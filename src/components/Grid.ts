import { createComponent } from "../utils/factory.js";

const COLUMN_MAP: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
  5: "md:grid-cols-5",
  6: "md:grid-cols-6",
  12: "md:grid-cols-12",
};

const GAP_MAP: Record<number, string> = {
  0: "gap-0",
  2: "gap-2",
  4: "gap-4",
  6: "gap-6",
  8: "gap-8",
  10: "gap-10",
  12: "gap-12",
  16: "gap-16",
};

export const Grid = createComponent({
  name: "Grid",
  description: "Système de grille responsive Mobile-First utilisant CSS Grid.",
  metaSchema: {
    cols: "Nombre de colonnes sur desktop (1 à 12). 1 colonne par défaut sur mobile.",
    gap: "Espacement entre les colonnes (0, 2, 4, 6, 8, 10, 12, 16).",
  },
  authorizedTokens: ["grid-gap", "grid-bg", "overflow", "overflow-x", "overflow-y"],
  template: (meta, children, styleVars, a11yAttrs) => {
    const cols = (meta.cols as number) || 2;
    const gap = (meta.gap as number) || 8;

    const colClass = COLUMN_MAP[cols] || "md:grid-cols-2";
    const gapClass = GAP_MAP[gap] || "gap-8";

    return `
      <section 
        style="${styleVars}; overflow: var(--overflow, visible); overflow-x: var(--overflow-x, var(--overflow, visible)); overflow-y: var(--overflow-y, var(--overflow, visible));" 
        class="grid grid-cols-1 ${colClass} ${gapClass} w-full max-w-7xl mx-auto px-4 py-8 bg-[var(--grid-bg,transparent)]"
        ${a11yAttrs}
      >
        ${children.join("")}
      </section>
    `;
  },
});
