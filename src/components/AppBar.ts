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
  "appbar-bg"?: string;
  /** Couleur de texte des liens. */
  "appbar-text"?: string;
  /** Couleur de la bordure inférieure. */
  "appbar-border"?: string;
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
  description: "Barre de navigation supérieure avec menu mobile.",
  authorizedTokens: ["appbar-bg", "appbar-text", "appbar-border", "backdrop-filter"],
  template: (meta: Record<string, any>, _children, styleVars, a11yAttrs, id) => {
    const title = meta.title || "My App";
    const links = (meta.links as AppBarMeta["links"]) || [];
    const btnId = `btn-${id}`;
    const menuId = `menu-${id}`;

    return `
    <nav 
      style="${styleVars}" 
      class="sticky top-0 z-50 w-full border-b border-[var(--appbar-border,theme(colors.gray.200))] bg-[var(--appbar-bg,white)] text-[var(--appbar-text,theme(colors.gray.900))]"
      ${a11yAttrs}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex items-center">
            <span class="text-xl font-bold tracking-tight">${title}</span>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            ${links.map((l) => `<a href="${l.href}" class="text-sm font-medium hover:text-blue-600 transition-colors">${l.label}</a>`).join("")}
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
          ${links.map((l) => `<a href="${l.href}" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-blue-600">${l.label}</a>`).join("")}
        </div>
      </div>
      <script>
        (function() {
          const btn = document.getElementById('${btnId}');
          const menu = document.getElementById('${menuId}');
          if (btn && menu) {
            btn.addEventListener('click', () => {
              const exp = btn.getAttribute('aria-expanded') === 'true';
              btn.setAttribute('aria-expanded', !exp);
              menu.classList.toggle('hidden');
            });
          }
        })();
      </script>
    </nav>`;
  },
});
