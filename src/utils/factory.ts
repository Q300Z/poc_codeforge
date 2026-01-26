import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  version: string; // Version obligatoire pour chaque type de composant
  description?: string;
  metaSchema?: Record<string, string>;
  authorizedTokens: string[] | Record<string, string>;
  template: (
    meta: Record<string, any>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string,
    id: string
  ) => string;
}

export interface DocumentedComponent extends Component {
  doc?: {
    name: string;
    version: string;
    description: string;
    metaSchema: Record<string, string>;
    authorizedTokens: Record<string, string>;
  };
}

export function createComponent({
  name,
  version,
  description = "",
  metaSchema = {},
  authorizedTokens,
  template,
}: FactoryOptions): DocumentedComponent {
  const tokenKeys = Array.isArray(authorizedTokens)
    ? authorizedTokens
    : Object.keys(authorizedTokens);

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

    const audioDesc = meta.audioDescription ? `aria-label="${meta.audioDescription}"` : "";

    // On injecte la version du composant dans les attributs HTML pour le debug/trace
    const a11yAttrs = `id="${id}" data-component-version="${version}" ${audioDesc} ${ariaAttrs}`;

    return template(meta, children, styleVars, a11yAttrs, id);
  };

  component.doc = {
    name,
    version,
    description,
    metaSchema,
    authorizedTokens: tokenDoc,
  };

  return component;
}
