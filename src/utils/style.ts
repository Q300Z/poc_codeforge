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
 * Convertit une couleur Hex en HSL.
 */
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h = 0,
    s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

/**
 * Convertit HSL en Hex.
 */
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

/**
 * Génère automatiquement une version sombre d'une couleur.
 * Stratégie : Inversion de la luminosité avec un seuil de sécurité.
 */
export function autoDarkColor(hex: string, isBackground: boolean = false): string {
  if (!hex.startsWith("#")) {
    const lower = hex.toLowerCase().trim();
    if (lower === "white") return isBackground ? "#1a1a1a" : "#ffffff";
    if (lower === "black") return isBackground ? "#ffffff" : "#f9fafb";
    if (lower === "transparent") return "transparent";

    // Gestion simplifiée du rgba(255,255,255,...) pour les fonds
    if (isBackground && lower.includes("255, 255, 255")) {
      return hex.replace(/255, 255, 255/g, "31, 41, 55"); // Vers un gris foncé (gray-800)
    }
    return hex;
  }
  const { h, s, l } = hexToHsl(hex);

  let newL;
  if (isBackground) {
    // Pour les fonds : si c'est clair (>50%), on rend très sombre. Sinon on éclaircit un peu.
    newL = l > 50 ? 10 + (100 - l) * 0.1 : l + 10;
  } else {
    // Pour le texte : si c'est sombre (<50%), on rend très clair.
    newL = l < 50 ? 90 - l * 0.1 : l - 20;
  }

  return hslToHex(h, s, Math.min(Math.max(newL, 5), 95));
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
