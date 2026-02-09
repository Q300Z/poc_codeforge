export const themeRuntime = `
    (function() {
      const STORAGE_KEY = 'codeforge-theme';
      const html = document.documentElement;
      
      window.CodeForge = window.CodeForge || {};
      
      window.CodeForge.setTheme = function(theme) {
        const isDark = theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
        html.classList.toggle('dark', isDark);
        
        if (theme === 'system') {
          localStorage.removeItem(STORAGE_KEY);
        } else {
          localStorage.setItem(STORAGE_KEY, theme);
        }
        window.CodeForge.currentTheme = theme;
        document.dispatchEvent(new CustomEvent('codeforge-theme-change', { detail: theme }));
      };

      // Initialisation immédiate pour éviter le flash
      const saved = localStorage.getItem(STORAGE_KEY);
      const initial = saved || window.CodeForge.defaultTheme || 'system';
      window.CodeForge.setTheme(initial);

      // Écouter les changements système
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (!localStorage.getItem(STORAGE_KEY)) {
          window.CodeForge.setTheme('system');
        }
      });
    })();
`;
