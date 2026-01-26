import { createComponent } from "../utils/factory.js";

export const Hero = createComponent({
  name: "Hero",
  authorizedTokens: ["hero-bg", "hero-text", "hero-bg-default", "hero-text-default"],
  template: (meta, _, styleVars, a11yAttrs) => `
    <section 
      class="hero-section" 
      style="${styleVars}"
      ${a11yAttrs}
      ${!meta["aria-labelledby"] ? 'aria-labelledby="hero-title"' : ""}
    >
      <h1 id="hero-title" class="hero-title">
        ${meta.title || "Default Title"}
      </h1>
      ${
        meta.subtitle
          ? `<p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">${meta.subtitle}</p>`
          : ""
      }
    </section>
  `,
});