import { Component } from "../types.js";
import { getStyleVariables } from "../utils/style.js";
import { validateStyle } from "../utils/validator.js";

const AUTHORIZED_TOKENS = ["btn-bg", "btn-text", "bg-color", "text-color"];

export const Button: Component = (props, _, style) => {
  validateStyle("Button", style, AUTHORIZED_TOKENS);
  const inlineStyle = getStyleVariables(style);
  
  return `
  <button 
    type="button" 
    style="${inlineStyle}"
    class="btn-base"
    ${props.ariaLabel ? `aria-label="${props.ariaLabel}"` : ""}
  >
    ${props.label || "Click me"}
  </button>
`;
};
