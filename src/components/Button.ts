import { createComponent } from "../utils/factory.js";

export const Button = createComponent({
  name: "Button",
  authorizedTokens: ["btn-bg", "btn-text", "bg-color", "text-color"],
  template: (props, _, styleVars, a11yAttrs) => `
    <button 
      type="button" 
      style="${styleVars}"
      class="btn-base"
      ${a11yAttrs}
    >
      ${props.label || "Click me"}
    </button>
  `,
});
