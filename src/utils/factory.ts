import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  authorizedTokens: string[];
  template: (
    meta: Record<string, unknown>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string,
    id: string
  ) => string;
}

export function createComponent({ name, authorizedTokens, template }: FactoryOptions): Component {
  return (
    meta,
    children,
    style,
    id = `gen-${Math.random().toString(36).slice(2, 9)}`
  ) => {
    validateStyle(name, style, authorizedTokens);
    const styleVars = getStyleVariables(style);

    // Extraction des aria-* restants dans meta
    const ariaAttrs = Object.entries(meta)
      .filter(([key]) => key.startsWith("aria-"))
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const a11yAttrs = `id="${id}" ${ariaAttrs}`;

    return template(meta, children, styleVars, a11yAttrs, id);
  };
}