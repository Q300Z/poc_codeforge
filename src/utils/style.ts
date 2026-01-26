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
 * Normalise une valeur de style : ajoute 'px' si c'est un nombre et que la propriété le demande
 */
function normalizeValue(key: string, value: string | number): string {
  if (typeof value === "number") {
    // Si la clé contient un breakpoint (ex: width-md), on vérifie la base (width)
    const baseKey = key.split("-")[0] || "";
    if (PX_PROPERTIES.includes(baseKey) || PX_PROPERTIES.includes(key)) {
      return `${value}px`;
    }
    return String(value);
  }
  return value;
}

/**
 * Transforme un objet de style en variables CSS (Custom Properties)
 * Supporte les nombres et la normalisation
 */
export function getStyleVariables(style?: Record<string, string | number>): string {
  if (!style) return "";
  return Object.entries(style)
    .map(([key, value]) => `--${key}: ${normalizeValue(key, value)};`)
    .join(" ");
}
