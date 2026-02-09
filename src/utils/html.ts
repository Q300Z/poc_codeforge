/**
 * @file html.ts
 * @description Utilitaires pour l'optimisation du HTML généré.
 */

/**
 * Minifie une chaîne HTML de manière agressive mais sûre.
 * Préserve l'intégrité des scripts et des styles.
 */
export function minifyHTML(html: string): string {
  const scripts: string[] = [];
  const styles: string[] = [];

  // 1. Extraction temporaire des blocs critiques pour éviter les dommages collatéraux
  const placeholderHtml = html
    .replace(/<script[\s\S]*?<\/script>/gi, (match) => {
      scripts.push(match);
      return `<!--CODEFORGE_SCRIPT_${scripts.length - 1}-->`;
    })
    .replace(/<style[\s\S]*?<\/style>/gi, (match) => {
      styles.push(match);
      return `<!--CODEFORGE_STYLE_${styles.length - 1}-->`;
    });

  // 2. Minification du squelette HTML
  const minified = placeholderHtml
    .replace(/<!--(?!CODEFORGE)[\s\S]*?-->/g, (match) => (match.startsWith("<!--[if") ? match : "")) // Supprime les commentaires sauf conditionnels et nos placeholders
    .replace(/>\s+</g, "><") // Supprime les espaces entre les balises
    .replace(/\s+/g, " ") // Réduit les espaces multiples
    .trim();

  // 3. Restauration des blocs et nettoyage léger (trim interne uniquement)
  return minified
    .replace(/<!--CODEFORGE_SCRIPT_(\d+)-->/g, (_, i) => {
      const content = scripts[parseInt(i)];
      return content;
    })
    .replace(/<!--CODEFORGE_STYLE_(\d+)-->/g, (_, i) => {
      const content = styles[parseInt(i)];
      return content;
    });
}
