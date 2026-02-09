import { appbarRuntime } from "../runtime/appbar.js";
import { CSSColor } from "../types.js";
import { NodeBuilder } from "../utils/builder.js";
import { createComponent } from "../utils/factory.js";

/** Interface des métadonnées pour le composant AppBar. */
export interface AppBarMeta {
  /** Titre de l'application affiché dans la barre. */
  title?: string;
  /** Liste des liens de navigation. */
  links?: { label: string; href: string }[];
}

/** Interface des Design Tokens pour le composant AppBar. */
export interface AppBarStyles {
  /** Couleur de fond de la barre. */
  "appbar-bg"?: CSSColor;
  /** Couleur de texte des liens. */
  "appbar-text"?: CSSColor;
  /** Couleur de la bordure inférieure. */
  "appbar-border"?: CSSColor;
  /** Effet de flou sur le fond (ex: blur(10px)). */
  "backdrop-filter"?: string;
}

/**
 * @class AppBarBuilder
 * @description Constructeur fluide pour le composant AppBar.
 */
export class AppBarBuilder extends NodeBuilder<AppBarMeta, AppBarStyles> {
  constructor(id: string) {
    super(id, "AppBar");
  }
  /** Définit le titre affiché. */
  withTitle(title: string): this {
    this.node.meta.title = title;
    return this;
  }
  /** Définit les liens de navigation. */
  withLinks(links: AppBarMeta["links"]): this {
    this.node.meta.links = links;
    return this;
  }
}

/**
 * @constant AppBar
 * @description Barre de navigation supérieure (Sticky) avec support mobile.
 */
export const AppBar = createComponent({
  name: "AppBar",
  version: "1.1.0",
  runtime: appbarRuntime,
  description:
    "Barre de navigation supérieure (Sticky) avec support mobile et menu burger automatique.",
  metaSchema: {
    title: {
      type: "string",
      description: "Titre de l'application affiché à gauche",
      default: "My App",
    },
    links: {
      type: "array",
      description: "Liste des liens de navigation { label: string, href: string }",
      default: [],
    },
  },
  authorizedTokens: {
    "appbar-bg": "Couleur de fond de la barre",
    "appbar-text": "Couleur de texte des liens",
    "appbar-border": "Couleur de la bordure inférieure",
    "backdrop-filter": "Effet de flou sur le fond (ex: blur(10px))",
  },
  examples: [
    {
      description: "Barre de navigation avec liens principaux.",
      builderCode: `const nav = new AppBarBuilder("main-nav")
  .withTitle("CodeForge")
  .withLinks([
    { label: "Accueil", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Blog", href: "/blog" }
  ])
  .build();`,
    },
  ],
  template: (meta: Record<string, any>, _children, styleVars, a11yAttrs, id, getStyleAttr, styleVarsDark) => {
    const title = meta.title || "My App";
    const links = (meta.links as AppBarMeta["links"]) || [];
    const btnId = `btn-${id}`;
    const menuId = `menu-${id}`;

    const combinedStyle = `border-color:var(--appbar-border,#e5e7eb);background-color:var(--appbar-bg,white);color:var(--appbar-text,#111827);${styleVars}${styleVarsDark}`;

    return `
    <nav 
      ${getStyleAttr(combinedStyle)} 
      class="sticky top-0 z-50 w-full border-b dark:bg-[var(--dark-appbar-bg,#111827)] dark:text-[var(--dark-appbar-text,#f9fafb)] dark:border-[var(--dark-appbar-border,#1f2937)]"
      ${a11yAttrs}
      id="${id}"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <span class="text-xl font-bold tracking-tight">${title}</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            ${links.map((l) => `<a href="${l.href}" class="text-sm font-medium underline hover:text-blue-600 transition-colors">${l.label}</a>`).join("")}
            
            <!-- Theme Switcher -->
            <div class="relative group ml-4">
              <button 
                id="theme-toggle-${id}"
                class="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-none cursor-pointer text-inherit"
                aria-label="Changer le thème"
              >
                <svg class="w-5 h-5 block dark:hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                <svg class="w-5 h-5 hidden dark:block" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
              </button>
              <div class="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-[60] py-1">
                <button onclick="CodeForge.setTheme('light')" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-none bg-transparent text-inherit cursor-pointer">Clair</button>
                <button onclick="CodeForge.setTheme('dark')" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-none bg-transparent text-inherit cursor-pointer">Sombre</button>
                <button onclick="CodeForge.setTheme('system')" class="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-sm border-none bg-transparent text-inherit cursor-pointer">Système</button>
              </div>
            </div>
          </div>
          <div class="flex items-center md:hidden">
            <button 
              id="${btnId}" 
              type="button" 
              class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100" 
              aria-expanded="false" 
              aria-controls="${menuId}"
              aria-label="Ouvrir le menu"
            >
              <svg class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div id="${menuId}" class="hidden md:hidden border-t border-gray-100 bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1">
          ${links.map((l) => `<a href="${l.href}" class="block px-3 py-2 rounded-md text-base font-medium underline hover:bg-gray-50 hover:text-blue-600">${l.label}</a>`).join("")}
        </div>
      </div>
      <script>CodeForge.initAppBar('${btnId}', '${menuId}');</script>
    </nav>`;
  },
});
