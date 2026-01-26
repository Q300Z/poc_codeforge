import { Component, ComponentHTML } from "../types.js";
import { getStyleVariables } from "./style.js";
import { validateStyle } from "./validator.js";

interface FactoryOptions {
  name: string;
  authorizedTokens: string[];
  template: (
    props: Record<string, unknown>,
    children: ComponentHTML[],
    styleVars: string,
    a11yAttrs: string
  ) => string;
}

/**
 * Factory pour créer des composants avec validation et styles automatiques
 */
export function createComponent({ name, authorizedTokens, template }: FactoryOptions): Component {
  return (props, children, style) => {
    // 1. Validation automatique des tokens
    validateStyle(name, style, authorizedTokens);

    // 2. Conversion automatique en variables CSS
    const styleVars = getStyleVariables(style);

    // 3. Préparation des attributs d'accessibilité de base
    const a11yAttrs = Object.entries(props)
      .filter(([key]) => key.startsWith("aria-") || key === "role" || key === "id")
      .map(([key, value]) => `${key}="${value}"`)
      .join(" ");

    // 4. Exécution du template spécifique au composant
    return template(props, children, styleVars, a11yAttrs);
  };
}
