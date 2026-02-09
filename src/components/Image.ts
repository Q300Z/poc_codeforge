import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Image. */
export interface ImageMeta {
  /** URL de l'image. */
  src: string;
  /** Texte alternatif OBLIGATOIRE pour l'accessibilité. */
  alt: string;
  /** Largeur native de l'image (pour éviter le CLS). */
  width?: number;
  /** Hauteur native de l'image (pour éviter le CLS). */
  height?: number;
  /** Stratégie de chargement. */
  loading?: "lazy" | "eager";
  /** Sources pour le responsive design. */
  srcset?: string;
  /** Tailles d'affichage pour le responsive. */
  sizes?: string;
}

/** Interface des Design Tokens pour le composant Image. */
export interface ImageStyles {
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
  /** Définit les dimensions natives. */
  withDimensions(width: number, height: number): this {
    this.node.meta.width = width;
    this.node.meta.height = height;
    return this;
  }
  /** Configure le chargement paresseux. */
  withLoading(loading: "lazy" | "eager"): this {
    this.node.meta.loading = loading;
    return this;
  }
  /** Configure les sources responsives. */
  withSrcSet(srcset: string, sizes?: string): this {
    this.node.meta.srcset = srcset;
    if (sizes) this.node.meta.sizes = sizes;
    return this;
  }
}

/**
 * @constant Image
 * @description Composant d'affichage d'image optimisé et accessible.
 */
export const Image = createComponent({
  name: "Image",
  version: "1.1.0",
  description:
    "Composant d'affichage d'image avec texte alternatif obligatoire, lazy loading et support responsive.",
  metaSchema: {
    src: { type: "string", description: "URL de l'image", required: true },
    alt: { type: "string", description: "Texte alternatif", required: true },
    width: { type: "number", description: "Largeur native" },
    height: { type: "number", description: "Hauteur native" },
    loading: {
      type: "enum",
      options: ["lazy", "eager"],
      description: "Stratégie de chargement",
      default: "lazy",
    },
    srcset: { type: "string", description: "Sources responsives" },
    sizes: { type: "string", description: "Tailles d'affichage" },
  },
  authorizedTokens: ["object-fit"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, _id, getStyleAttr, styleVarsDark) => {
    if (!meta.src) return "<!-- Image manquante -->";

    const loading = meta.loading || "lazy";
    const width = meta.width ? `width="${meta.width}"` : "";
    const height = meta.height ? `height="${meta.height}"` : "";
    const srcset = meta.srcset ? `srcset="${meta.srcset}"` : "";
    const sizes = meta.sizes ? `sizes="${meta.sizes}"` : "";

    return `
      <img 
        src="${meta.src}" 
        alt="${meta.alt || ""}" 
        ${width} ${height}
        loading="${loading}"
        ${srcset} ${sizes}
        ${getStyleAttr(styleVars + "object-fit:var(--object-fit,cover);")} 
        class="w-full h-auto block rounded-[var(--border-radius,0)]"
        ${a11yAttrs}
      />
    `;
  },
});
