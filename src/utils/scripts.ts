/**
 * @file scripts.ts
 * @description Scripts JavaScript partagés injectés dans les pages.
 */

export const SHARED_SCRIPTS = {
  appbar: `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initAppBar = function(btnId, menuId) {
      const btn = document.getElementById(btnId);
      const menu = document.getElementById(menuId);
      if (btn && menu) {
        btn.addEventListener('click', () => {
          const exp = btn.getAttribute('aria-expanded') === 'true';
          btn.setAttribute('aria-expanded', !exp);
          menu.classList.toggle('hidden');
        });
      }
    };
  `,
  carousel: `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initCarousel = function(id, autoPlay, interval) {
      const container = document.getElementById(id);
      const wrapper = container.querySelector('.carousel-wrapper');
      const slides = container.querySelectorAll('.carousel-slide');
      const dots = container.querySelectorAll('.carousel-dot');
      const prevBtn = document.getElementById('prev-' + id);
      const nextBtn = document.getElementById('next-' + id);
      
      let currentIndex = 0;
      let timer = null;

      function update() {
        wrapper.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        dots.forEach((dot, i) => {
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
          if (i === currentIndex) {
             dot.classList.add('bg-[var(--carousel-color,white)]');
             dot.classList.remove('bg-[var(--carousel-color,white)]/50');
          } else {
             dot.classList.remove('bg-[var(--carousel-color,white)]');
             dot.classList.add('bg-[var(--carousel-color,white)]/50');
          }
        });
        slides.forEach((slide, i) => {
          slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        });
      }

      function next() { currentIndex = (currentIndex + 1) % slides.length; update(); }
      function prev() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; update(); }
      function goTo(index) { currentIndex = index; update(); }

      function startAutoPlay() { if (autoPlay && !timer) timer = setInterval(next, interval); }
      function stopAutoPlay() { if (timer) { clearInterval(timer); timer = null; } }

      if (nextBtn) nextBtn.addEventListener('click', () => { next(); stopAutoPlay(); });
      if (prevBtn) prevBtn.addEventListener('click', () => { prev(); stopAutoPlay(); });
      dots.forEach((dot, i) => dot.addEventListener('click', () => { goTo(i); stopAutoPlay(); }));

      container.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { prev(); stopAutoPlay(); }
        if (e.key === 'ArrowRight') { next(); stopAutoPlay(); }
      });

      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();
      update();
    };
  `,
  map: `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initMap = function(containerId, lat, lng, zoom, tileUrl, controls, markers, geoJsonSrc) {
      const init = () => {
        if (typeof L === 'undefined') return;
        const map = L.map(containerId).setView([lat, lng], zoom);
        L.tileLayer(tileUrl, { attribution: '&copy; OpenStreetMap' }).addTo(map);
        if (controls.includes('scale')) L.control.scale().addTo(map);
        markers.forEach(m => {
          const marker = L.marker([m.lat, m.lng]).addTo(map);
          if (m.name) marker.bindPopup(m.name);
        });
        if (geoJsonSrc) {
          fetch(geoJsonSrc).then(res => res.json()).then(data => L.geoJSON(data).addTo(map));
        }
      };
      if (window.L) init(); else window.addEventListener('load', init);
    };
  `,
};
