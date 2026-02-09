import { CSSColor, CSSLength } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";
import { Text } from "./Text.js";
import { Title } from "./Title.js";

/** Interface des métadonnées pour le composant Hero. */
export interface HeroMeta {
  /** Titre principal affiché en grand. */
  title: string;
  /** Paragraphe descriptif affiché sous le titre. */
  subtitle?: string;
}

/** Interface des Design Tokens pour le composant Hero. */
export interface HeroStyles {
  /** Couleur ou dégradé de fond de la section. */
  "hero-bg"?: CSSColor;
  /** Couleur du texte du titre. */
  "hero-text"?: CSSColor;
  /** Padding vertical (hauteur) du bandeau. */
  "section-py"?: CSSLength;
}

/**
 * @class HeroBuilder
 * @description Constructeur fluide pour le composant Hero.
 */
export class HeroBuilder extends NodeBuilder<HeroMeta, HeroStyles> {
  constructor(id: string) {
    super(id, "Hero");
  }
  /** Définit le titre principal. */
  withTitle(title: string): this {
    this.node.meta.title = title;
    return this;
  }
  /** Définit le sous-titre. */
  withSubtitle(subtitle: string): this {
    this.node.meta.subtitle = subtitle;
    return this;
  }
}

/**
 * @constant Hero
 * @description Bandeau d'accueil sémantique à fort impact.
 * Utilise les composants Title et Text en interne pour garantir une hiérarchie HTML parfaite.
 */
export const Hero = createComponent({
  name: "Hero",
  version: "1.3.0",
  description: "Bandeau d'accueil sémantique à fort impact avec titre et sous-titre.",
  metaSchema: {
    title: {
      type: "string",
      description: "Titre principal affiché en grand (H1)",
      required: true,
    },
    subtitle: {
      type: "string",
      description: "Paragraphe descriptif affiché sous le titre",
      required: false,
    },
  },
  authorizedTokens: {
    "hero-bg": "Couleur ou dégradé de fond de la section",
    "hero-text": "Couleur du texte du titre",
    "section-py": "Padding vertical (hauteur) du bandeau",
  },
  examples: [
    {
      description: "Configuration d'un bandeau d'accueil classique.",
      builderCode: `const hero = new HeroBuilder("main-hero")
  .withTitle("Propulsez vos idées")
  .withSubtitle("La plateforme low-code pour les équipes ambitieuses.")
  .withStyle({ "hero-bg": "#f3f4f6", "section-py": 80 })
  .build();`,
    },
  ],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, id, getStyleAttr, styleVarsDark) => {
    const renderedTitle = Title(
      {
        ...meta, // Contient parentBg et parentBgDark
        content: meta.title || "Title",
        level: 1,
        version: "1.1.0",
        createdAt: meta.createdAt,
      },
      [],
      { "title-text": "var(--hero-text, inherit)" },
      `${id}-title`,
      { "title-text": "var(--dark-hero-text, inherit)" }
    );

    const renderedSubtitle = meta.subtitle
      ? Text(
          {
            ...meta,
            content: meta.subtitle,
            version: "1.0.0",
            createdAt: meta.createdAt,
          },
          [],
          {},
          `${id}-subtitle`,
          {}
        )
      : "";

    const combinedStyle = `${styleVars}${styleVarsDark}`;

    return `
    <section 
      class="hero-section dark:bg-[var(--dark-hero-bg,linear-gradient(135deg,#111827_0%,#1f2937_100%))]" 
      ${getStyleAttr(combinedStyle)} 
      ${a11yAttrs}
    >
      <div class="hero-content">
        ${renderedTitle}
        ${renderedSubtitle ? `<div class="hero-subtitle-wrapper text-lg leading-8 max-w-2xl mx-auto">${renderedSubtitle}</div>` : ""}
      </div>
    </section>`;
  },
});