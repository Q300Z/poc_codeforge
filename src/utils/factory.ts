import { Component, ComponentHTML } from "../types.js";
import { renderState } from "./state.js";
import { autoDarkColor, getStyleAttr, getStyleVariables } from "./style.js";
import { LAYOUT_UTILITIES, validateStyle } from "./validator.js";

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
  runtime?: string;
  examples?: {
    builderCode: string;
    description?: string;
  }[];
  template: (
    meta: Record<string, any>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string,
    id: string,
    getStyleAttr: (content: string) => string,
    styleVarsDark: string
  ) => string;
}

export interface DocumentedComponent extends Component {
  runtime?: string;
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
    runtime,
    examples,
    template,
  } = options;

  const tokenKeys = Array.isArray(authorizedTokens)
    ? authorizedTokens
    : Object.keys(authorizedTokens);

  // Pré-calcul du Set des clés autorisées pour des recherches O(1)
  const allowedKeysSet = new Set([...LAYOUT_UTILITIES, ...tokenKeys]);

  const component: DocumentedComponent = (meta, children, style, id, styleDark) => {
    // Enregistrement automatique du runtime si présent
    if (runtime) {
      renderState.requireScript(name);
    }

    // Lazy ID generation
    const finalId = id || `gen-${Math.random().toString(36).slice(2, 9)}`;

    if (!id) {
      console.error(`[CodeForge] ID manquant pour : ${name}`);
    }

    // Gestion paresseuse des métadonnées obligatoires
    // On ne clone que si nécessaire (si version ou createdAt manquent)
    let finalMeta = meta;
    if (!finalMeta.version || !finalMeta.createdAt) {
      finalMeta = { ...meta };
      if (!finalMeta.version) finalMeta.version = version;
      if (!finalMeta.createdAt) finalMeta.createdAt = new Date().toISOString();
    }

    validateStyle(name, style, allowedKeysSet);

    // --- GÉNÉRATION AUTOMATIQUE DU MODE SOMBRE DÉSACTIVÉE ---
    let finalStyleDark = {}; // styleDark;
    /*
    const isDarkEmpty = !finalStyleDark || Object.keys(finalStyleDark).length === 0;

    if (isDarkEmpty && style) {
      finalStyleDark = {};
      for (const key in style) {
        const val = style[key];
        if (typeof val === "string" && val.startsWith("#")) {
          const isBg = key.includes("bg") || key.includes("hero-bg") || key.includes("section-bg");
          finalStyleDark[key] = autoDarkColor(val, isBg);
        } else if (typeof val === "string" || typeof val === "number") {
          finalStyleDark[key] = val;
        }
      }
    }
    */

    if (finalStyleDark && Object.keys(finalStyleDark).length > 0) {
      validateStyle(`${name} (Dark)`, finalStyleDark, allowedKeysSet);
    }

    const styleVars = getStyleVariables(style);
    const styleVarsDark = getStyleVariables(finalStyleDark, "dark");

    // --- LOGIQUE D'ACCESSIBILITÉ AUTOMATIQUE ---
    let a11yAttrs = `id="${finalId}"`;

    // 1. Audio Description -> aria-label
    if (finalMeta.audioDescription) {
      a11yAttrs += ` aria-label="${finalMeta.audioDescription}"`;
    }

    // 2. Rôle sémantique
    if (finalMeta.ariaRole) {
      a11yAttrs += ` role="${finalMeta.ariaRole}"`;
    }

    // 3. Invisibilité sémantique
    if (finalMeta.ariaHidden) {
      a11yAttrs += ` aria-hidden="true"`;
    }

    // 4. Conservation des autres attributs aria-* manuels
    for (const key in finalMeta) {
      if (key.startsWith("aria-") && key !== "aria-label" && key !== "aria-hidden") {
        a11yAttrs += ` ${key}="${finalMeta[key]}"`;
      }
    }

    return template(
      finalMeta,
      children,
      styleVars,
      a11yAttrs,
      finalId,
      getStyleAttr,
      styleVarsDark
    );
  };

  const tokensObj = Array.isArray(authorizedTokens)
    ? authorizedTokens.reduce((acc, t) => ({ ...acc, [t]: "" }), {})
    : authorizedTokens;

  component.runtime = runtime;
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
