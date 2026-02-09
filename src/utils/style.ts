import { LAYOUT_UTILITIES } from "./validator.js";

/**
 * Liste des propriétés qui nécessitent une unité 'px' par défaut si un nombre est fourni
 */
const PX_PROPERTIES = new Set([
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
  "x",
  "y",
  "gap",
  "stack-gap",
  "section-py",
  "border-radius",
  "font-size",
]);

/**
 * Normalise une valeur de style : ajoute 'px' si c'est un nombre
 */
function normalizeValue(key: string, value: string | number): string {
  if (typeof value === "number") {
    const baseKey = key.includes("-") ? key.split("-")[0] : key;
    if (PX_PROPERTIES.has(baseKey) || PX_PROPERTIES.has(key)) {
      return `${value}px`;
    }
    return String(value);
  }
  return value;
}

/**
 * Mappe les propriétés CodeForge vers les propriétés CSS standards
 */
const PROPERTY_MAP: Record<string, string> = {
  x: "left",
  y: "top",
};

/**
 * Transforme un objet de style en une chaîne d'attributs style HTML.
 * - Les propriétés de Layout (top, left, etc.) sont appliquées directement.
 * - Les Design Tokens et variantes responsives sont appliqués comme variables CSS.
 */
export function getStyleVariables(style?: Record<string, any>): string {
  if (!style) return "";

  let result = "";

  for (const key in style) {
    const value = style[key];
    if (value === undefined || value === null || value === "") continue;

    let normalizedValue = normalizeValue(key, value);

    // Sécurité : on retire un éventuel point-virgule à la fin de la valeur
    if (typeof normalizedValue === "string" && normalizedValue.endsWith(";")) {
      normalizedValue = normalizedValue.slice(0, -1);
    }

    // Mapping des alias (x -> left, y -> top)
    const cssKey = PROPERTY_MAP[key] || key;

    // Si c'est une propriété de layout pure (sans suffixe comme -md)
    if (LAYOUT_UTILITIES.has(key) || LAYOUT_UTILITIES.has(cssKey)) {
      result += `${cssKey}: ${normalizedValue}; `;
    } else {
      // Sinon, c'est un token ou une variante responsive -> Variable CSS
      result += `--${key}: ${normalizedValue}; `;
    }
  }

  return result.trim();
}
