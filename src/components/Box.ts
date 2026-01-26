import { createComponent } from "../utils/factory.js";
import { NodeBuilder } from "../utils/builder.js";

export interface BoxStyles {
  "bg-color"?: string;
  "width"?: string | number;
  "height"?: string | number;
  "border-radius"?: string | number;
  "flex-shrink"?: string | number;
}

export class BoxBuilder extends NodeBuilder<any, BoxStyles> {
  constructor(id: string) { super(id, "Box"); }
}

export const Box = createComponent({
  name: "Box",
  version: "1.1.0",
  description: "Bloc de structure simple.",
  authorizedTokens: ["bg-color", "width", "height", "border-radius", "flex-shrink"],
  template: (_meta, _children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}" 
      class="bg-[var(--bg-color,#e5e7eb)] w-[var(--width,100%)] h-[var(--height,100px)] rounded-[var(--border-radius,0.5rem)]"
      ${a11yAttrs}
    ></div>
  `,
});