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
 * Calcule la luminance relative d'une couleur hexadécimale.
 */
function getLuminance(hex: string): number {
  const rgb = hex.startsWith("#") ? hex.slice(1) : hex;
  const r = parseInt(rgb.slice(0, 2), 16) / 255;
  const g = parseInt(rgb.slice(2, 4), 16) / 255;
  const b = parseInt(rgb.slice(4, 6), 16) / 255;

  const a = [r, g, b].map((v) => {
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

/**
 * Calcule le ratio de contraste entre deux couleurs.
 * @returns Ratio entre 1 et 21.
 */
export function getContrastRatio(foreground: string, background: string): number {
  const lum1 = getLuminance(foreground);
  const lum2 = getLuminance(background);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

/**
 * Valide le contraste et renvoie une couleur corrigée si nécessaire.
 */
export function validateContrast(
  fg: string,
  bg: string,
  componentName: string,
  id: string
): string {
  // Ignorer si ce ne sont pas des couleurs hex (ex: variables CSS)
  if (!fg.startsWith("#") || !bg.startsWith("#")) return fg;

  const ratio = getContrastRatio(fg, bg);
  if (ratio < 4.5) {
    const isBgDark = getLuminance(bg) < 0.5;
    const correctedFg = isBgDark ? "#ffffff" : "#111827";
    console.warn(
      `[CodeForge A11y] Ratio insuffisant (${ratio.toFixed(2)}:1) pour ${componentName}#${id}. ` +
        `Fond: ${bg}, Texte: ${fg}. Correction auto : ${correctedFg}`
    );
    return correctedFg;
  }
  return fg;
}

/**
 * Transforme un objet de style en une chaîne de propriétés CSS (sans l'attribut style="").
 * - Les propriétés de Layout (top, left, etc.) sont appliquées directement.
 * - Les Design Tokens et variantes responsives sont appliqués comme variables CSS.
 */
export function getStyleVariables(style?: Record<string, any>, prefix: string = ""): string {
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
    if (!prefix && (LAYOUT_UTILITIES.has(key) || LAYOUT_UTILITIES.has(cssKey))) {
      result += `${cssKey}:${normalizedValue};`;
    } else {
      // Sinon, c'est un token ou une variante responsive -> Variable CSS
      // On applique le préfixe si fourni (utile pour le mode sombre)
      const varName = prefix ? `${prefix}-${key}` : key;
      result += `--${varName}:${normalizedValue};`;
    }
  }

  return result;
}

/**
 * Enveloppe le contenu du style dans un attribut HTML style="" si non vide.
 */
export function getStyleAttr(content: string): string {
  return content ? `style="${content}"` : "";
}
