import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface GridMeta {
  cols?: number;
  gap?: number;
}

export interface GridStyles {
  "grid-gap"?: string | number;
  "grid-bg"?: string;
}

export class GridBuilder extends NodeBuilder<GridMeta, GridStyles> {
  constructor(id: string) { super(id, "Grid"); }
  withCols(cols: number): this { this.node.meta.cols = cols; return this; }
  withGap(gap: number): this { this.node.meta.gap = gap; return this; }
}

const COLUMN_MAP: Record<number, string> = {
  1: "md:grid-cols-1", 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-4",
  5: "md:grid-cols-5", 6: "md:grid-cols-6", 12: "md:grid-cols-12",
};

export const Grid = createComponent({
  name: "Grid",
  version: "1.1.0",
  authorizedTokens: ["grid-gap", "grid-bg"],
  template: (meta: Record<string, any>, children, styleVars, a11yAttrs) => {
    const colClass = COLUMN_MAP[meta.cols as number] || "md:grid-cols-2";
    return `
      <section 
        style="${styleVars}" 
        class="grid grid-cols-1 ${colClass} gap-${meta.gap || 8} w-full max-w-7xl mx-auto px-4 py-8 bg-[var(--grid-bg,transparent)]"
        ${a11yAttrs}
      >
        ${children.join("")}
      </section>
    `;
  },
});
