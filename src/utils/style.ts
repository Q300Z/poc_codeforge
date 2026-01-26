/**
 * Transforme un objet de style en variables CSS (Custom Properties)
 * Exemple: { "primary-color": "#ff0000" } -> "--primary-color: #ff0000;"
 */
export function getStyleVariables(style?: Record<string, string>): string {
  if (!style) return "";
  return Object.entries(style)
    .map(([key, value]) => `--${key}: ${value};`)
    .join(" ");
}
