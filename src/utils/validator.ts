/**
 * Utilitaire de validation local à chaque composant
 */
export function validateStyle(
  componentName: string,
  style: Record<string, string> | undefined,
  authorizedKeys: string[]
): void {
  if (!style) return;

  const keys = Object.keys(style);
  const invalidKeys = keys.filter((key) => !authorizedKeys.includes(key));

  if (invalidKeys.length > 0) {
    console.warn(
      `[Design System] ${componentName} warning: Use of unauthorized tokens: ${invalidKeys.join(", ")}`
    );
  }
}
