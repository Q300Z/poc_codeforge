import { Component } from "../types.js";
import { getStyleVariables } from "../utils/style.js";
import { validateStyle } from "../utils/validator.js";

const AUTHORIZED_TOKENS = ["hero-bg", "hero-text", "hero-bg-default", "hero-text-default"];

export const Hero: Component = (props, _, style) => {
  validateStyle("Hero", style, AUTHORIZED_TOKENS);
  const inlineStyle = getStyleVariables(style);

  return `
  <section 
    class="hero-section" 
    style="${inlineStyle}"
    aria-labelledby="hero-title"
  >
    <h1 id="hero-title" class="hero-title">
      ${props.title || "Default Title"}
    </h1>
    ${props.subtitle ? `<p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">${props.subtitle}</p>` : ""}
  </section>
`;
};
