import { LAYOUT_UTILITIES } from "./validator.js";

/**
 * Liste des propriétés qui nécessitent une unité 'px' par défaut si un nombre est fourni
 */
const PX_PROPERTIES = [
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
  "top",
  "left",
  "bottom",
  "right",
  "gap",
  "stack-gap",
  "section-py",
  "border-radius",
];

/**
 * Normalise une valeur de style : ajoute 'px' si c'est un nombre
 */
function normalizeValue(key: string, value: string | number): string {
  if (typeof value === "number") {
    const baseKey = key.split("-")[0] || "";
    if (PX_PROPERTIES.includes(baseKey) || PX_PROPERTIES.includes(key)) {
      return `${value}px`;
    }
    return String(value);
  }
  return value;
}

/**
 * Transforme un objet de style en une chaîne d'attributs style HTML.
 * - Les propriétés de Layout (top, left, etc.) sont appliquées directement.
 * - Les Design Tokens et variantes responsives sont appliqués comme variables CSS.
 */
export function getStyleVariables(style?: Record<string, any>): string {
  if (!style) return "";

  return Object.entries(style)
    .map(([key, value]) => {
      const normalized = normalizeValue(key, value);

      // Si c'est une propriété de layout pure (sans suffixe comme -md)
      if (LAYOUT_UTILITIES.includes(key)) {
        return `${key}: ${normalized};`;
      }

      // Sinon, c'est un token ou une variante responsive -> Variable CSS
      return `--${key}: ${normalized};`;
    })
    .join(" ");
}
