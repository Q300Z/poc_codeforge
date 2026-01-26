import { createComponent } from "../utils/factory.js";

const AUTHORIZED_TOKENS = {
  "brand-primary": "Couleur primaire de la marque.",
  "brand-secondary": "Couleur secondaire de la marque.",
  "appbar-bg": "Couleur de fond globale de l'AppBar.",
  "appbar-text": "Couleur de texte globale de l'AppBar.",
  "appbar-border": "Couleur de bordure globale de l'AppBar.",
  "btn-bg-default": "Couleur de fond par défaut de tous les boutons.",
  "btn-text-default": "Couleur de texte par défaut de tous les boutons.",
  "hero-bg-default": "Couleur de fond par défaut de tous les Hero.",
  "hero-text-default": "Couleur de texte par défaut de tous les Hero.",
  "section-py": "Padding vertical par défaut de toutes les sections.",
};

export const Page = createComponent({
  name: "Page",
  description:
    "Composant racine gérant le layout global, le thème et l'injection du header/footer.",
  metaSchema: {
    appName: "Nom de l'application (utilisé comme titre de page).",
    debug: "Active le mode debug visuel (true/false).",
  },
  authorizedTokens: AUTHORIZED_TOKENS,
  template: (meta, children, styleVars, _a11yAttrs, _id) => {
    const debug = meta.debug === true;
    const header = (meta.renderedHeader as string) || "";
    const footer = (meta.renderedFooter as string) || "";

    return `
<!DOCTYPE html>
<html lang="fr" class="h-full bg-white">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.appName || "Generated Page - POC"}</title>
    <link rel="stylesheet" href="/src/style.css">
    <style>
      .btn-base {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        transition-duration: 150ms;
        background-color: var(--btn-bg, var(--btn-bg-default, #2563eb));
        color: var(--btn-text, var(--btn-text-default, white));
      }
      .hero-section {
        padding: 4rem 2rem;
        text-align: center;
        background-color: var(--hero-bg, var(--hero-bg-default, #f9fafb));
      }
      .hero-title {
        font-size: 2.25rem;
        font-weight: 800;
        color: var(--hero-text, var(--hero-text-default, #111827));
      }
      [data-debug-theme="true"] * {
        outline: 1px dashed rgba(255, 0, 255, 0.3);
      }
    </style>
</head>
<body class="site-wrapper" style="${styleVars}" ${debug ? 'data-debug-theme="true"' : ""}>
    ${header}
    
    <main class="main-content">
        ${children.join("")}
    </main>

    <footer class="w-full">
      ${footer}
    </footer>
</body>
</html>
`;
  },
});
