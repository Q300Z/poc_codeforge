import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Video. */
export interface VideoMeta {
  /** URL de la source vidéo. */
  src: string;
  /** URL d'une image affichée avant la lecture. */
  poster?: string;
  /** Affiche les contrôles de lecture. Défaut : true. */
  controls?: boolean;
  /** Lecture automatique. Défaut : false. */
  autoplay?: boolean;
  /** Lecture en boucle. Défaut : false. */
  loop?: boolean;
  /** Désactive le son (souvent requis pour l'autoplay). */
  muted?: boolean;
}

/** Interface des Design Tokens pour le composant Video. */
export interface VideoStyles {
  /** Rayon de courbure des angles. */
  "border-radius"?: string | number;
}

/**
 * @class VideoBuilder
 * @description Constructeur fluide pour le composant Video.
 */
export class VideoBuilder extends NodeBuilder<VideoMeta, VideoStyles> {
  constructor(id: string) {
    super(id, "Video");
  }
  /** Définit la source vidéo. */
  withSrc(src: string): this {
    this.node.meta.src = src;
    return this;
  }
  /** Définit l'image de couverture. */
  withPoster(url: string): this {
    this.node.meta.poster = url;
    return this;
  }
  /** Configure les options de lecture. */
  withOptions(opts: {
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
  }): this {
    this.node.meta = { ...this.node.meta, ...opts };
    return this;
  }
}

/**
 * @constant Video
 * @description Composant lecteur vidéo HTML5.
 */
export const Video = createComponent({
  name: "Video",
  version: "1.0.0",
  description: "Lecteur vidéo HTML5 accessible.",
  authorizedTokens: ["border-radius"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs) => {
    if (!meta.src) return "<!-- Vidéo manquante -->";

    const controls = meta.controls !== false ? "controls" : "";
    const autoplay = meta.autoplay ? "autoplay" : "";
    const loop = meta.loop ? "loop" : "";
    const muted = meta.muted ? "muted" : "";
    const poster = meta.poster ? `poster="${meta.poster}"` : "";

    return `
      <video 
        src="${meta.src}" 
        ${poster}
        ${controls} ${autoplay} ${loop} ${muted}
        style="${styleVars}" 
        class="w-full h-auto block rounded-[var(--border-radius,0)]"
        ${a11yAttrs}
      >
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    `;
  },
});
