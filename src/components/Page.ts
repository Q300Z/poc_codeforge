import { registry } from "../registry.js";
import { BaseStyles, Node } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent, DocumentedComponent } from "../utils/factory.js";
import { renderState } from "../utils/state.js";

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
  description:
    "Composant racine injectant le squelette HTML5, les styles globaux et les composants partagés (Header/Footer).",
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
  template: (meta: Record<string, any>, children, styleVars, _a11yAttrs, _id, getStyleAttr) => {
    const cssPath = meta.cssPath || "style.css";
    const cssLink = meta.isInline ? "" : `<link rel="stylesheet" href="${cssPath}">`;

    // 1. Collecte des scripts nécessaires (dédupliqués via renderState)
    let bodyScripts = "";
    let headScripts = "";

    // Scripts lourds (libs externes)
    if (renderState.requiredScripts.has("Map")) {
      headScripts += meta.mapLibCssContent
        ? `<style>${meta.mapLibCssContent}</style>`
        : `<link rel="stylesheet" href="./libs/leaflet.css" />`;
      bodyScripts += meta.mapLibJsContent
        ? `<script>${meta.mapLibJsContent}</script>`
        : `<script src="./libs/leaflet.js"></script>`;
    }

    // Runtime CodeForge partagé (Collecte dynamique depuis le Registry)
    let runtimeJs = "";
    renderState.requiredScripts.forEach((type) => {
      const comp = registry[type] as DocumentedComponent;
      if (comp && comp.runtime) {
        runtimeJs += comp.runtime;
      } else {
        console.warn(`[CodeForge] Script runtime demandé mais non trouvé pour le type : ${type}`);
      }
    });

    if (runtimeJs) {
      headScripts += `<script>(function(){${runtimeJs}})();</script>`;
    }

    return `
<!DOCTYPE html>
<html lang="fr" class="h-full">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${meta.appName || "Generated Page"}</title>
    ${cssLink}
    ${headScripts}
</head>
<body class="site-wrapper h-full" ${getStyleAttr(styleVars)} ${meta.debug ? 'data-debug-theme="true"' : ""}>
    <header class="w-full max-w-none">${meta.renderedHeader || ""}</header>
    <main class="main-content w-full max-w-none">${children.join("")}</main>
    <footer class="w-full max-w-none">${meta.renderedFooter || ""}</footer>
    ${bodyScripts}
</body>
</html>`;
  },
});
