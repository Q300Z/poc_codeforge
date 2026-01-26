import { createComponent } from "../utils/factory.js";

export const Hero = createComponent({
  name: "Hero",
  description: "Bandeau d'accueil d'une page avec un titre et un sous-titre.",
  metaSchema: {
    title: "Titre principal (H1).",
    subtitle: "Paragraphe descriptif optionnel.",
  },
  authorizedTokens: {
    "hero-bg": "Couleur de fond du bandeau.",
    "hero-text": "Couleur du texte du titre.",
    "hero-bg-default": "", // Pas de description -> ne sera pas affiché dans la doc
    "hero-text-default": "", // Idem
    "section-py": "", // Idem
  },
  template: (meta, _, styleVars, a11yAttrs) => `
    <section 
      class="hero-section" 
      style="${styleVars}"
      ${a11yAttrs}
      ${!meta["aria-labelledby"] ? 'aria-labelledby="hero-title"' : ""}
    >
      <h1 id="hero-title" class="hero-title">
        ${meta.title || "Default Title"}
      </h1>
      ${
        meta.subtitle
          ? `<p class="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">${meta.subtitle}</p>`
          : ""
      }
    </section>
  `,
});
