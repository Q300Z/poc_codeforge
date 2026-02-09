import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface pour les pistes de texte (sous-titres, légendes). */
export interface VideoTrack {
  src: string;
  kind?: "subtitles" | "captions" | "descriptions" | "chapters" | "metadata";
  srclang?: string;
  label?: string;
  default?: boolean;
}

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
  /** Lecture inline sur mobile (iOS). Défaut : false. */
  playsinline?: boolean;
  /** Stratégie de préchargement. */
  preload?: "auto" | "metadata" | "none";
  /** Largeur native. */
  width?: number;
  /** Hauteur native. */
  height?: number;
  /** Pistes de sous-titres ou légendes. */
  tracks?: VideoTrack[];
}

/** Interface des Design Tokens pour le composant Video. */
export interface VideoStyles {
  /** Mode de redimensionnement (cover, contain, etc.). */
  "object-fit"?: "cover" | "contain" | "fill" | "none";
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
  /** Définit les dimensions natives. */
  withDimensions(width: number, height: number): this {
    this.node.meta.width = width;
    this.node.meta.height = height;
    return this;
  }
  /** Ajoute une piste de sous-titres. */
  addTrack(track: VideoTrack): this {
    if (!this.node.meta.tracks) this.node.meta.tracks = [];
    this.node.meta.tracks.push(track);
    return this;
  }
  /** Configure les options de lecture. */
  withOptions(opts: {
    controls?: boolean;
    autoplay?: boolean;
    loop?: boolean;
    muted?: boolean;
    playsinline?: boolean;
    preload?: VideoMeta["preload"];
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
  version: "1.2.0",
  description: "Lecteur vidéo HTML5 accessible et performant.",
  metaSchema: {
    src: { type: "string", description: "URL de la vidéo", required: true },
    poster: { type: "string", description: "Image de couverture" },
    controls: { type: "boolean", description: "Contrôles", default: true },
    autoplay: { type: "boolean", description: "Lecture automatique", default: false },
    muted: { type: "boolean", description: "Muet", default: false },
    loop: { type: "boolean", description: "Boucle", default: false },
    playsinline: { type: "boolean", description: "Lecture inline (iOS)", default: false },
    preload: { type: "enum", options: ["auto", "metadata", "none"], description: "Préchargement" },
    width: { type: "number", description: "Largeur native" },
    height: { type: "number", description: "Hauteur native" },
    tracks: { type: "array", description: "Pistes de sous-titres" },
  },
  authorizedTokens: ["object-fit"],
  template: (
    meta: Record<string, any>,
    _,
    styleVars,
    a11yAttrs,
    _id,
    getStyleAttr,
    _styleVarsDark
  ) => {
    if (!meta.src) return "<!-- Vidéo manquante -->";

    const controls = meta.controls !== false ? "controls" : "";
    const autoplay = meta.autoplay ? "autoplay" : "";
    const loop = meta.loop ? "loop" : "";
    const muted = meta.muted ? "muted" : "";
    const playsinline = meta.playsinline ? "playsinline" : "";
    const poster = meta.poster ? `poster="${meta.poster}"` : "";
    const preload = meta.preload ? `preload="${meta.preload}"` : "";
    const width = meta.width ? `width="${meta.width}"` : "";
    const height = meta.height ? `height="${meta.height}"` : "";

    const tracksHTML = ((meta.tracks as VideoTrack[]) || [])
      .map((t) => {
        const kind = t.kind || "captions";
        const srclang = t.srclang ? `srclang="${t.srclang}"` : "";
        const label = t.label ? `label="${t.label}"` : "";
        const def = t.default ? "default" : "";
        return `<track kind="${kind}" src="${t.src}" ${srclang} ${label} ${def} />`;
      })
      .join("");

    return `
      <video 
        src="${meta.src}" 
        ${poster}
        ${controls} ${autoplay} ${loop} ${muted} ${playsinline}
        ${preload} ${width} ${height}
        ${getStyleAttr(styleVars + "object-fit:var(--object-fit,cover);")} 
        class="w-full h-auto block rounded-[var(--border-radius,0)]"
        ${a11yAttrs}
      >
        ${tracksHTML}
        Votre navigateur ne supporte pas la lecture de vidéos.
      </video>
    `;
  },
});
