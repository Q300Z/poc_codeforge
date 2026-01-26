import { createComponent } from "../utils/factory.js";

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

export const Stack = createComponent({
  name: "Stack",
  description: "Moteur d'espacement utilisant Flexbox pour aligner des éléments.",
  metaSchema: {
    direction: "Orientation des éléments : 'vertical' (colonne) ou 'horizontal' (ligne).",
    align: "Alignement des items (start, center, end, stretch).",
    justify: "Justification du contenu (start, center, end, between).",
    gap: "Espacement entre les items (0, 2, 4, 6, 8, 10, 12, 16).",
  },
  authorizedTokens: {
    "stack-gap": "Espacement personnalisé via CSS Variable.",
  },
  template: (meta, children, styleVars, a11yAttrs) => {
    const direction = meta.direction === "horizontal" ? "flex-row" : "flex-col";
    const align = meta.align || "start";
    const justify = meta.justify || "start";
    const gap = (meta.gap as number) || 6;

    const gapClass = GAP_MAP[gap] || "gap-6";

    return `
      <div 
        style="${styleVars}; overflow: var(--overflow, visible); overflow-x: var(--overflow-x, var(--overflow, visible)); overflow-y: var(--overflow-y, var(--overflow, visible)); width: var(--width, auto); height: var(--height, auto);" 
        class="flex ${direction} ${gapClass} items-${align} justify-${justify}"
        ${a11yAttrs}
      >
        ${children.join("")}
      </div>
    `;
  },
});
