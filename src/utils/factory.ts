import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  description?: string;
  metaSchema?: Record<string, string>;
  authorizedTokens: string[] | Record<string, string>;
  template: (
    meta: Record<string, unknown>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string,
    id: string
  ) => string;
}

export interface DocumentedComponent extends Component {
  doc?: {
    name: string;
    description: string;
    metaSchema: Record<string, string>;
    authorizedTokens: Record<string, string>;
  };
}

export function createComponent({
  name,
  description = "",
  metaSchema = {},
  authorizedTokens,
  template,
}: FactoryOptions): DocumentedComponent {
  // Toujours extraire les clés pour la validation
  const tokenKeys = Array.isArray(authorizedTokens)
    ? authorizedTokens
    : Object.keys(authorizedTokens);

  // Filtrer les tokens pour la doc : on ne garde que ceux qui ont une description explicite
  const tokenDoc: Record<string, string> = {};
  if (!Array.isArray(authorizedTokens)) {
    for (const [token, desc] of Object.entries(authorizedTokens)) {
      if (desc && desc.trim().length > 0) {
        tokenDoc[token] = desc;
      }
    }
  }

  const component: DocumentedComponent = (
    meta,
    children,
    style,
    id = `gen-${Math.random().toString(36).slice(2, 9)}`
  ) => {
    validateStyle(name, style, tokenKeys);
    const styleVars = getStyleVariables(style);

    const ariaAttrs = Object.entries(meta)
      .filter(([key]) => key.startsWith("aria-"))
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const a11yAttrs = `id="${id}" ${ariaAttrs}`;

    return template(meta, children, styleVars, a11yAttrs, id);
  };

  component.doc = {
    name,
    description,
    metaSchema,
    authorizedTokens: tokenDoc,
  };

  return component;
}
