import { createComponent } from "../utils/factory.js";

export const Grid = createComponent({
  name: "Grid",
  authorizedTokens: ["grid-gap", "grid-bg"],
  template: (props, children, styleVars, a11yAttrs) => {
    // Mobile-first: 1 colonne par défaut, nb de colonnes configurable pour desktop (md+)
    const cols = props.cols || 2;
    const gap = props.gap || 6;

    return `
      <section 
        style="${styleVars}" 
        class="grid grid-cols-1 md:grid-cols-${cols} gap-${gap} w-full max-w-7xl mx-auto px-4 py-8 bg-[var(--grid-bg,transparent)]"
        ${a11yAttrs}
      >
        ${children.join("")}
      </section>
    `;
  },
});
