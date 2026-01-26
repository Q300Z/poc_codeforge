import { createComponent } from "../utils/factory.js";
import { Title } from "./Title.js";
import { Text } from "./Text.js";

export const Hero = createComponent({
  name: "Hero",
  version: "1.3.0",
  description: "Bandeau d'accueil d'une page utilisant des sous-composants sémantiques.",
  metaSchema: {
    title: "Titre principal.",
    subtitle: "Paragraphe descriptif optionnel.",
  },
  authorizedTokens: {
    "hero-bg": "Couleur de fond du bandeau.",
    "hero-text": "Couleur du texte du titre.",
  },
  template: (meta: Record<string, any>, _, styleVars, a11yAttrs, id) => {
    // On utilise les composants Title et Text en interne pour la cohérence
    const renderedTitle = Title(
      { content: meta.title || "Default Title", level: 1 }, 
      [], 
      { "text-color": "var(--hero-text, inherit)" },
      `${id}-title`
    );

    const renderedSubtitle = meta.subtitle 
      ? Text(
          { content: meta.subtitle }, 
          [], 
          { "text-color": "inherit" },
          `${id}-subtitle`
        )
      : "";

    return `
    <section 
      class="hero-section" 
      style="${styleVars}"
      ${a11yAttrs}
      ${!meta["aria-labelledby"] ? `aria-labelledby="${id}-title"` : ""}
    >
      <div class="hero-content">
        ${renderedTitle}
        ${renderedSubtitle ? `<div class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">${renderedSubtitle}</div>` : ""}
      </div>
    </section>
  `;
  },
});