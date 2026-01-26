import { createComponent } from "../utils/factory.js";

export const Section = createComponent({
  name: "Section",
  authorizedTokens: [
    "section-bg",
    "section-py",
    "height",
    "min-height",
    "overflow",
    "overflow-x",
    "overflow-y",
  ],
  template: (_meta, children, styleVars, a11yAttrs) => `
    <section 
      style="${styleVars}" 
      class="section-pad bg-[var(--section-bg,transparent)]"
      ${a11yAttrs}
    >
      ${children.join("")}
    </section>
  `,
});
