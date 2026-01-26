import { createComponent } from "../utils/factory.js";
import { Title } from "./Title.js";
import { Text } from "./Text.js";
import { NodeBuilder } from "../utils/builder.js";

export interface HeroMeta {
  title: string;
  subtitle?: string;
}

export interface HeroStyles {
  "hero-bg"?: string;
  "hero-text"?: string;
}

export class HeroBuilder extends NodeBuilder<HeroMeta, HeroStyles> {
  constructor(id: string) { super(id, "Hero"); }
  withTitle(title: string): this { this.node.meta.title = title; return this; }
  withSubtitle(subtitle: string): this { this.node.meta.subtitle = subtitle; return this; }
}

export const Hero = createComponent({
  name: "Hero",
  version: "1.3.0",
  description: "Bandeau d'accueil sémantique.",
  authorizedTokens: ["hero-bg", "hero-text"],
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, id) => {
    const renderedTitle = Title({ content: meta.title || "Title", level: 1 }, [], { "text-color": "var(--hero-text, inherit)" }, `${id}-title`);
    const renderedSubtitle = meta.subtitle ? Text({ content: meta.subtitle }, [], {}, `${id}-subtitle`) : "";

    return `
    <section class="hero-section" style="${styleVars}" ${a11yAttrs}>
      <div class="hero-content">
        ${renderedTitle}
        ${renderedSubtitle ? `<div class="mt-6">${renderedSubtitle}</div>` : ""}
      </div>
    </section>`;
  },
});
