import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface StackMeta {
  direction?: "vertical" | "horizontal";
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "between";
  gap?: number;
}

export interface StackStyles {
  "stack-gap"?: string | number;
}

export class StackBuilder extends NodeBuilder<StackMeta, StackStyles> {
  constructor(id: string) { super(id, "Stack"); }
  withDirection(direction: StackMeta["direction"]): this { this.node.meta.direction = direction; return this; }
  withAlign(align: StackMeta["align"]): this { this.node.meta.align = align; return this; }
  withJustify(justify: StackMeta["justify"]): this { this.node.meta.justify = justify; return this; }
  withGap(gap: number): this { this.node.meta.gap = gap; return this; }
}

export const Stack = createComponent({
  name: "Stack",
  version: "1.1.0",
  authorizedTokens: ["stack-gap"],
  template: (meta: Record<string, any>, children, styleVars, a11yAttrs) => {
    return `<div style="${styleVars}" class="flex ${meta.direction === "horizontal" ? "flex-row" : "flex-col"}" ${a11yAttrs}>${children.join("")}</div>`;
  },
});