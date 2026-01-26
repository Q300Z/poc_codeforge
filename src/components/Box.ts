import { createComponent } from "../utils/factory.js";

export const Box = createComponent({
  name: "Box",
  authorizedTokens: ["bg-color", "width", "height", "border-radius", "flex-shrink"],
  template: (_meta, _children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}; flex-shrink: var(--flex-shrink, 1);" 
      class="bg-[var(--bg-color,#e5e7eb)] w-[var(--width,100%)] h-[var(--height,100px)] rounded-[var(--border-radius,0.5rem)]"
      ${a11yAttrs}
    ></div>
  `,
});
