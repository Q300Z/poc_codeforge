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
  "hero-bg"?: string;
  /** Couleur du texte du titre. */
  "hero-text"?: string;
  /** Padding vertical (hauteur) du bandeau. */
  "section-py"?: string | number;
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
  description: "Bandeau d'accueil sémantique.",
  authorizedTokens: ["hero-bg", "hero-text", "section-py"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, id) => {
    const renderedTitle = Title(
      {
        content: meta.title || "Title",
        level: 1,
        version: "1.1.0",
        createdAt: meta.createdAt,
      },
      [],
      { "text-color": "var(--hero-text, inherit)" },
      `${id}-title`
    );

    const renderedSubtitle = meta.subtitle
      ? Text(
          {
            content: meta.subtitle,
            version: "1.0.0",
            createdAt: meta.createdAt,
          },
          [],
          {},
          `${id}-subtitle`
        )
      : "";

    return `
    <section class="hero-section" style="${styleVars}" ${a11yAttrs}>
      <div class="hero-content">
        ${renderedTitle}
        ${renderedSubtitle ? `<div class="hero-subtitle-wrapper text-lg leading-8 max-w-2xl mx-auto">${renderedSubtitle}</div>` : ""}
      </div>
    </section>`;
  },
});
