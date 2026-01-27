/**
 * @file validator.ts
 * @description Services de validation pour le respect du Design System.
 */

/**
 * Liste des propriétés CSS natives gérées directement comme attributs style.
 */
export const LAYOUT_UTILITIES = [
  "width",
  "height",
  "min-width",
  "min-height",
  "max-width",
  "max-height",
  "position",
  "top",
  "left",
  "bottom",
  "right",
  "x", // Alias pour left
  "y", // Alias pour top
  "z-index",
  "overflow",
  "overflow-x",
  "overflow-y",
  "flex-shrink",
  "flex-grow",
  "transform",
  "opacity",
  "border-radius",
  "border",
];

/**
 * Valide que les clés de style fournies à un composant sont autorisées.
 * Émet un avertissement dans la console si une clé est inconnue.
 *
 * @param {string} componentName - Nom du composant (pour le log).
 * @param {Record<string, any>} style - Objet de style à valider.
 * @param {string[]} authorizedTokens - Liste des Design Tokens propres au composant.
 */
export function validateStyle(
  componentName: string,
  style: Record<string, any> | undefined,
  authorizedTokens: string[]
): void {
  if (!style) return;

  const allowedKeys = [...LAYOUT_UTILITIES, ...authorizedTokens];

  Object.keys(style).forEach((key) => {
    // On extrait la racine si c'est une variante responsive (ex: width-md -> width)
    const baseKey = key.split("-")[0];

    if (!allowedKeys.includes(key) && !allowedKeys.includes(baseKey)) {
      console.warn(
        `[Design System] ${componentName} warning: Utilisation de tokens non autorisés : ${key}`
      );
    }
  });
}
