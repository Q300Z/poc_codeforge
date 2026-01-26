import { createComponent } from "../utils/factory.js";

export const AppBar = createComponent({
  name: "AppBar",
  authorizedTokens: [
    "appbar-bg",
    "appbar-text",
    "appbar-border",
    "backdrop-filter",
    "width",
    "width-md",
  ],
  template: (meta, _children, styleVars, a11yAttrs, id) => {
    const title = meta.title || "My App";
    const links = (meta.links as { label: string; href: string }[]) || [];
    const btnId = `btn-${id}`;
    const menuId = `menu-${id}`;
    const menuIconId = `icon-m-${id}`;
    const closeIconId = `icon-c-${id}`;

    return `
    <nav 
      style="${styleVars}" 
      class="sticky top-0 z-50 w-full border-b border-[var(--appbar-border,theme(colors.gray.200))] bg-[var(--appbar-bg,white)] text-[var(--appbar-text,theme(colors.gray.900))]"
      ${a11yAttrs}
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex items-center">
            <span class="text-xl font-bold tracking-tight">${title}</span>
          </div>
          
          <div class="hidden md:flex items-center space-x-8">
            ${links
              .map(
                (link) => `
              <a href="${link.href}" class="text-sm font-medium hover:text-blue-600 transition-colors">${link.label}</a>
            `
              )
              .join("")}
          </div>

          <div class="flex items-center md:hidden">
            <button 
              id="${btnId}"
              type="button" 
              class="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-expanded="false"
              aria-controls="${menuId}"
            >
              <span class="sr-only">Ouvrir le menu</span>
              <svg id="${menuIconId}" class="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg id="${closeIconId}" class="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div id="${menuId}" class="hidden md:hidden border-t border-gray-100 bg-white">
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          ${links
            .map(
              (link) => `
            <a href="${link.href}" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-50 hover:text-blue-600">${link.label}</a>
          `
            )
            .join("")}
        </div>
      </div>

      <script>
        (function() {
          const button = document.getElementById('${btnId}');
          const menu = document.getElementById('${menuId}');
          const menuIcon = document.getElementById('${menuIconId}');
          const closeIcon = document.getElementById('${closeIconId}');

          if (button && menu) {
            button.addEventListener('click', () => {
              const expanded = button.getAttribute('aria-expanded') === 'true';
              button.setAttribute('aria-expanded', !expanded);
              menu.classList.toggle('hidden');
              menuIcon.classList.toggle('hidden');
              closeIcon.classList.toggle('hidden');
            });
          }
        })();
      </script>
    </nav>
    `;
  },
});
