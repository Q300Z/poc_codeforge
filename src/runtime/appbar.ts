export const appbarRuntime = `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initAppBar = function(btnId, menuId, themeBtnId, themeMenuId) {
      const btn = document.getElementById(btnId);
      const menu = document.getElementById(menuId);
      if (btn && menu) {
        btn.addEventListener('click', function() {
          const exp = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !exp);
          menu.classList.toggle('hidden');
        });
      }

      // Gestion du sélecteur de thème
      const themeBtn = document.getElementById(themeBtnId);
      const themeMenu = document.getElementById(themeMenuId);
      if (themeBtn && themeMenu) {
        themeBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          const exp = themeBtn.getAttribute('aria-expanded') === 'true';
          themeBtn.setAttribute('aria-expanded', !exp);
          themeMenu.classList.toggle('opacity-0');
          themeMenu.classList.toggle('invisible');
        });

        document.addEventListener('click', () => {
          themeBtn.setAttribute('aria-expanded', 'false');
          themeMenu.classList.add('opacity-0', 'invisible');
        });

        themeMenu.addEventListener('click', (e) => e.stopPropagation());
      }

      // Gestion du lien actif
      const currentPath = window.location.pathname.split('/').pop() || 'index.html';
      const navLinks = document.querySelectorAll('nav a');
      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath || (currentPath === '' && href === 'index.html')) {
          link.classList.add('text-blue-600', 'font-bold', 'dark:text-blue-400');
          link.setAttribute('aria-current', 'page');
        }
      });
    };
`;
