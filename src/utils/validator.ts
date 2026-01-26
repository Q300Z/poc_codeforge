/**
 * Propriétés de mise en page autorisées pour TOUS les composants de structure
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
  "z-index",
  "overflow",
  "overflow-x",
  "overflow-y",
  "flex-shrink",
  "flex-grow",
  "transform",
  "opacity",
];

/**
 * Utilitaire de validation local à chaque composant
 */
export function validateStyle(
  componentName: string,
  style: Record<string, string | number> | undefined,
  authorizedKeys: string[]
): void {
  if (!style) return;

  const keys = Object.keys(style);
  const invalidKeys = keys.filter((key) => {
    // 1. On nettoie la clé des suffixes responsives
    const baseKey = key
      .split("-")
      .filter((part) => !["sm", "md", "lg", "xl", "2xl"].includes(part))
      .join("-");

    // 2. On vérifie si c'est un utilitaire global OU un token spécifique au composant
    const isGlobalUtility = LAYOUT_UTILITIES.includes(baseKey) || LAYOUT_UTILITIES.includes(key);
    const isComponentToken = authorizedKeys.includes(baseKey) || authorizedKeys.includes(key);

    return !isGlobalUtility && !isComponentToken;
  });

  if (invalidKeys.length > 0) {
    console.warn(
      `[Design System] ${componentName} warning: Use of unauthorized tokens: ${invalidKeys.join(", ")}`
    );
  }
}
