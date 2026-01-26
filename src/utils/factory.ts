import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  description?: string; // Documentation du composant
  metaSchema?: Record<string, string>; // Description des champs meta
  authorizedTokens: string[];
  template: (
    meta: Record<string, unknown>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string,
    id: string
  ) => string;
}

/**
 * Interface étendue pour porter la documentation
 */
export interface DocumentedComponent extends Component {
  doc?: {
    name: string;
    description: string;
    metaSchema: Record<string, string>;
    authorizedTokens: string[];
  };
}

export function createComponent({
  name,
  description = "",
  metaSchema = {},
  authorizedTokens,
  template,
}: FactoryOptions): DocumentedComponent {
  const component: DocumentedComponent = (
    meta,
    children,
    style,
    id = `gen-${Math.random().toString(36).slice(2, 9)}`
  ) => {
    validateStyle(name, style, authorizedTokens);
    const styleVars = getStyleVariables(style);

    const ariaAttrs = Object.entries(meta)
      .filter(([key]) => key.startsWith("aria-"))
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const a11yAttrs = `id="${id}" ${ariaAttrs}`;

    return template(meta, children, styleVars, a11yAttrs, id);
  };

  // On attache la documentation à la fonction
  component.doc = {
    name,
    description,
    metaSchema,
    authorizedTokens,
  };

  return component;
}
