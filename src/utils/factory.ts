import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  version: string;
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

  const component: DocumentedComponent = (meta, children, style, id) => {
    // 1. Validation et fallback ID
    let finalId = id;
    if (!finalId) {
      console.error(`[CodeForge] Error: Component "${name}" is missing required property "id"`);
      finalId = `gen-${Math.random().toString(36).slice(2, 9)}`;
    }

    // 2. Validation et fallback Version/Date
    const finalMeta = { ...meta };
    if (!finalMeta.version) {
      console.warn(
        `[CodeForge] Warning: Component "${finalId}" is missing "meta.version". Falling back to default: ${version}`
      );
      finalMeta.version = version;
    }
    if (!finalMeta.createdAt) {
      console.warn(`[CodeForge] Warning: Component "${finalId}" is missing "meta.createdAt"`);
      finalMeta.createdAt = new Date().toISOString();
    }

    validateStyle(name, style, tokenKeys);
    const styleVars = getStyleVariables(style);

    const ariaAttrs = Object.entries(finalMeta)
      .filter(([key]) => key.startsWith("aria-"))
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const audioDesc = finalMeta.audioDescription
      ? `aria-label="${finalMeta.audioDescription}"`
      : "";
    const a11yAttrs = `id="${finalId}" data-component-version="${finalMeta.version}" ${audioDesc} ${ariaAttrs}`;

    return template(finalMeta, children, styleVars, a11yAttrs, finalId);
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
