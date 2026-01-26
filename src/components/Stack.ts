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
  version: "1.1.0",
  description: "Moteur d'espacement utilisant Flexbox pour aligner des éléments.",
  metaSchema: {
    direction: "Orientation des éléments : 'vertical' ou 'horizontal'.",
    align: "Alignement des items (start, center, end, stretch).",
    justify: "Justification du contenu (start, center, end, between).",
    gap: "Espacement entre les items (0 à 16).",
  },
  authorizedTokens: {
    "stack-gap": "Espacement personnalisé via CSS Variable.",
  },
  template: (meta: Record<string, any>, children, styleVars, a11yAttrs) => {
    const direction = meta.direction === "horizontal" ? "flex-row" : "flex-col";
    const align = meta.align || "start";
    const justify = meta.justify || "start";
    const gap = (meta.gap as number) || 6;

    const gapClass = GAP_MAP[gap] || "gap-6";

    return `
      <div 
        style="${styleVars}" 
        class="flex ${direction} ${gapClass} items-${align} justify-${justify}"
        ${a11yAttrs}
      >
        ${children.join("")}
      </div>
    `;
  },
});
