export const appbarRuntime = `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initAppBar = function(btnId, menuId) {
      const btn = document.getElementById(btnId);
      const menu = document.getElementById(menuId);
      if (btn && menu) {
        btn.addEventListener('click', function() {
          const exp = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !exp);
          menu.classList.toggle('hidden');
        });
      }
    };
`;
