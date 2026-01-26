import { BaseStyles, Node } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant Page. */
export interface PageMeta {
  /** Nom de l'application (utilisé dans la balise <title>). */
  appName: string;
  /** Active les contours en pointillés pour faciliter le design. */
  debug?: boolean;
}

/** Type représentant un nœud racine de page. */
export interface PageNode extends Node<PageMeta, BaseStyles> {
  type: "Page";
}

/**
 * @class PageBuilder
 * @description Constructeur fluide pour la structure racine d'une page.
 */
export class PageBuilder extends NodeBuilder<PageMeta, BaseStyles> {
  constructor(id: string) {
    super(id, "Page");
  }
  /** Définit le nom de l'application. */
  withAppName(name: string): this {
    this.node.meta.appName = name;
    return this;
  }
  /** Active ou désactive le mode debug visuel. */
  withDebug(enabled: boolean = true): this {
    this.node.meta.debug = enabled;
    return this;
  }
  /** Finalise la page en tant que PageNode. */
  build(): PageNode {
    return super.build() as PageNode;
  }
}

/**
 * @constant Page
 * @description Composant racine injectant le squelette HTML5, les styles globaux, et les composants partagés.
 */
export const Page = createComponent({
  name: "Page",
  version: "1.4.0",
  authorizedTokens: [
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
  ],
  template: (meta: Record<string, any>, children, styleVars, _a11yAttrs, _id) => {
    return `
<!DOCTYPE html>
<html lang="fr" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.appName || "Generated Page"}</title>
    <link rel="stylesheet" href="/src/style.css">
</head>
<body class="site-wrapper h-full" style="${styleVars}" ${meta.debug ? 'data-debug-theme="true"' : ""}>
    <header>${meta.renderedHeader || ""}</header>
    <main class="main-content">${children.join("")}</main>
    <footer class="w-full">${meta.renderedFooter || ""}</footer>
</body>
</html>`;
  },
});
