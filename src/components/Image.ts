import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Image. */
export interface ImageMeta {
  /** URL de l'image. */
  src: string;
  /** Texte alternatif OBLIGATOIRE pour l'accessibilité. */
  alt: string;
}

/** Interface des Design Tokens pour le composant Image. */
export interface ImageStyles {
  /** Rayon de courbure des angles. */
  "border-radius"?: string | number;
  /** Mode de redimensionnement (cover, contain, etc.). */
  "object-fit"?: "cover" | "contain" | "fill" | "none";
}

/**
 * @class ImageBuilder
 * @description Constructeur fluide pour le composant Image.
 */
export class ImageBuilder extends NodeBuilder<ImageMeta, ImageStyles> {
  constructor(id: string) {
    super(id, "Image");
  }
  /** Définit la source de l'image. */
  withSrc(src: string): this {
    this.node.meta.src = src;
    return this;
  }
  /** Définit le texte alternatif (A11y). */
  withAlt(alt: string): this {
    this.node.meta.alt = alt;
    return this;
  }
}

/**
 * @constant Image
 * @description Composant d'affichage d'image optimisé et accessible.
 */
export const Image = createComponent({
  name: "Image",
  version: "1.0.0",
  description: "Composant d'affichage d'image avec texte alternatif obligatoire.",
  authorizedTokens: ["border-radius", "object-fit"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    if (!meta.src) return "<!-- Image manquante -->";

    return `
      <img 
        src="${meta.src}" 
        alt="${meta.alt || ""}" 
        style="${styleVars} object-fit: var(--object-fit, cover);" 
        class="w-full h-auto block rounded-[var(--border-radius,0)]"
        ${a11yAttrs}
      />
    `;
  },
});
