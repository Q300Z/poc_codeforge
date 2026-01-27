/**
 * @file placeholder.ts
 * @description Utilitaire centralisé pour la génération d'images de remplacement (DRY/SOLID).
 */

export interface PlaceholderOptions {
  text?: string;
  format?: "png" | "jpg" | "webp";
}

/**
 * @class Placeholder
 * @description Service de génération d'URLs pour placehold.net.
 */
export class Placeholder {
  private static readonly BASE_URL = "https://placehold.net";

  /**
   * Génère une URL de placeholder générique.
   */
  static custom(width: number, height: number, options: PlaceholderOptions = {}): string {
    const format = options.format || "png";
    const url = `${this.BASE_URL}/${width}x${height}.${format}`;

    if (options.text) {
      return `${url}?text=${encodeURIComponent(options.text)}`;
    }
    return url;
  }

  /** Raccourci pour une image carrée. */
  static square(size: 400 | 600, text?: string): string {
    return this.custom(size, size, { text });
  }

  /** Raccourci pour une image portrait (verticale). */
  static portrait(size: "small" | "large", text?: string): string {
    const dims = size === "small" ? { w: 400, h: 600 } : { w: 600, h: 800 };
    return this.custom(dims.w, dims.h, { text });
  }

  /** Raccourci pour une image landscape (horizontale). */
  static landscape(size: "small" | "large", text?: string): string {
    const dims = size === "small" ? { w: 600, h: 400 } : { w: 800, h: 600 };
    return this.custom(dims.w, dims.h, { text });
  }
}
