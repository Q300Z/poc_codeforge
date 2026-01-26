import { Component } from "../types.js";
import { getStyleVariables } from "../utils/style.js";
import { validateStyle } from "../utils/validator.js";

const AUTHORIZED_TOKENS = [
  "brand-primary",
  "brand-secondary",
  "appbar-bg",
  "appbar-text",
  "appbar-border",
  "btn-bg-default",
  "btn-text-default",
  "hero-bg-default",
  "hero-text-default",
  "section-py",
  "position",
  "height",
  "width",
];

export const Page: Component = (meta, children, style) => {
  validateStyle("Page", style, AUTHORIZED_TOKENS);
  const globalStyles = getStyleVariables(style);
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
<body class="site-wrapper" style="${globalStyles}" ${debug ? 'data-debug-theme="true"' : ""}>
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
};
