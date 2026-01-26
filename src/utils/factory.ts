import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

/**
 * Options de configuration pour la Factory.
 * @internal
 */
interface MetaField {
  type: "string" | "number" | "boolean" | "enum" | "object" | "array";
  description: string;
  default?: any;
  required?: boolean;
  options?: string[]; // Pour les enums
}

interface FactoryOptions {
  name: string;
  version: string;
  description?: string;
  metaSchema?: Record<string, MetaField | string>;
  authorizedTokens: string[] | Record<string, string>;
  examples?: {
    builderCode: string;
    description?: string;
  }[];
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
    metaSchema: Record<string, any>;
    authorizedTokens: Record<string, string>;
    examples?: {
      builderCode: string;
      description?: string;
    }[];
  };
}

/**
 * @function createComponent
 * @description Factory centrale qui injecte automatiquement l'accessibilité.
 * Le champ "audioDescription" devient "aria-label".
 * Le champ "ariaRole" devient "role".
 */
export function createComponent(options: FactoryOptions): DocumentedComponent {
  const {
    name,
    version,
    description = "",
    metaSchema = {},
    authorizedTokens,
    examples,
    template,
  } = options;

  const tokenKeys = Array.isArray(authorizedTokens)
    ? authorizedTokens
    : Object.keys(authorizedTokens);

  const component: DocumentedComponent = (meta, children, style, id) => {
    let finalId = id;
    if (!finalId) {
      console.error(`[CodeForge] ID manquant pour : ${name}`);
      finalId = `gen-${Math.random().toString(36).slice(2, 9)}`;
    }

    const finalMeta = { ...meta };
    if (!finalMeta.version) finalMeta.version = version;
    if (!finalMeta.createdAt) finalMeta.createdAt = new Date().toISOString();

    validateStyle(name, style, tokenKeys);
    const styleVars = getStyleVariables(style);

    // --- LOGIQUE D'ACCESSIBILITÉ AUTOMATIQUE ---
    const a11y: string[] = [];

    // 1. Audio Description -> aria-label
    if (finalMeta.audioDescription) {
      a11y.push(`aria-label="${finalMeta.audioDescription}"`);
    }

    // 2. Rôle sémantique
    if (finalMeta.ariaRole) {
      a11y.push(`role="${finalMeta.ariaRole}"`);
    }

    // 3. Invisibilité sémantique
    if (finalMeta.ariaHidden) {
      a11y.push(`aria-hidden="true"`);
    }

    // 4. Conservation des autres attributs aria-* manuels
    const customAria = Object.entries(finalMeta)
      .filter(([key]) => key.startsWith("aria-") && key !== "aria-label" && key !== "aria-hidden")
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    const a11yAttrs = `id="${finalId}" data-component-version="${finalMeta.version}" ${a11y.join(" ")} ${customAria}`;

    return template(finalMeta, children, styleVars, a11yAttrs, finalId);
  };

  const tokensObj = Array.isArray(authorizedTokens)
    ? authorizedTokens.reduce((acc, t) => ({ ...acc, [t]: "" }), {})
    : authorizedTokens;

  component.doc = {
    name,
    version,
    description,
    metaSchema,
    authorizedTokens: tokensObj,
    examples,
  };
  return component;
}
