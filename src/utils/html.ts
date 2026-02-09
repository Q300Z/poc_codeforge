/**
 * @file html.ts
 * @description Utilitaires pour l'optimisation du HTML généré.
 */

/**
 * Minifie une chaîne HTML de manière agressive mais sûre.
 * - Supprime les retours à la ligne et les espaces inutiles entre les balises.
 * - Supprime les commentaires HTML (sauf commentaires conditionnels).
 * - Réduit les espaces multiples à un seul espace.
 * - Nettoie les blocs <style> et <script> (suppression des espaces inutiles).
 */
export function minifyHTML(html: string): string {
  return (
    html
      .replace(/<!--[\s\S]*?-->/g, (match) => (match.startsWith("<!--[if") ? match : "")) // Supprime les commentaires sauf conditionnels
      .replace(/>\s+</g, "><") // Supprime les espaces entre les balises
      .replace(/\s+/g, " ") // Réduit les espaces multiples
      // Minification basique des blocs style et script
      .replace(
        /<style>([\s\S]*?)<\/style>/gi,
        (_, content) =>
          `<style>${content.replace(/\s+/g, " ").replace(/\{\s+/g, "{").replace(/\s+\}/g, "}").replace(/;\s+/g, ";").trim()}</style>`
      )
      .replace(
        /<script>([\s\S]*?)<\/script>/gi,
        (_, content) => `<script>${content.replace(/\s+/g, " ").trim()}</script>`
      )
      .trim()
  );
}
