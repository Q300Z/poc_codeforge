import { createComponent } from "../utils/factory.js";

export const Button = createComponent({
  name: "Button",
  authorizedTokens: ["btn-bg", "btn-text", "bg-color", "text-color", "position", "top", "left", "width", "height"],
  template: (meta, _, styleVars, a11yAttrs) => `
    <button 
      type="button" 
      style="${styleVars}"
      class="btn-base"
      ${a11yAttrs}
    >
      ${meta.label || "Click me"}
    </button>
  `,
});