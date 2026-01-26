import { createComponent } from "../utils/factory.js";

export const Container = createComponent({
  name: "Container",
  authorizedTokens: ["container-width", "position", "height", "width", "left", "top", "overflow"],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <div 
      style="${styleVars}" 
      class="container-center"
      ${a11yAttrs}
    >
      ${children.join("")}
    </div>
  `,
});
