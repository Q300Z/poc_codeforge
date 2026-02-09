export const carouselRuntime = `
    window.CodeForge = window.CodeForge || {};
    window.CodeForge.initCarousel = function(id, autoPlay, interval) {
      const container = document.getElementById(id);
      if (!container) return;
      const wrapper = container.querySelector('.carousel-wrapper');
      const slides = container.querySelectorAll('.carousel-slide');
      const dots = container.querySelectorAll('.carousel-dot');
      const prevBtn = document.getElementById('prev-' + id);
      const nextBtn = document.getElementById('next-' + id);
      
      let currentIndex = 0;
      let timer = null;

      function update() {
        if (wrapper) wrapper.style.transform = 'translateX(-' + (currentIndex * 100) + '%)';
        dots.forEach(function(dot, i) {
          dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
          if (i === currentIndex) {
             dot.classList.add('bg-[var(--carousel-color,white)]');
             dot.classList.remove('bg-[var(--carousel-color,white)]/50');
          } else {
             dot.classList.remove('bg-[var(--carousel-color,white)]');
             dot.classList.add('bg-[var(--carousel-color,white)]/50');
          }
        });
        slides.forEach(function(slide, i) {
          slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
        });
      }

      function next() { currentIndex = (currentIndex + 1) % slides.length; update(); }
      function prev() { currentIndex = (currentIndex - 1 + slides.length) % slides.length; update(); }
      function goTo(index) { currentIndex = index; update(); }

      function startAutoPlay() { if (autoPlay && !timer) timer = setInterval(next, interval); }
      function stopAutoPlay() { if (timer) { clearInterval(timer); timer = null; } }

      if (nextBtn) nextBtn.addEventListener('click', function() { next(); stopAutoPlay(); });
      if (prevBtn) prevBtn.addEventListener('click', function() { prev(); stopAutoPlay(); });
      dots.forEach(function(dot, i) { dot.addEventListener('click', function() { goTo(i); stopAutoPlay(); }); });

      container.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') { prev(); stopAutoPlay(); }
        if (e.key === 'ArrowRight') { next(); stopAutoPlay(); }
      });

      container.addEventListener('mouseenter', stopAutoPlay);
      container.addEventListener('mouseleave', startAutoPlay);

      startAutoPlay();
      update();
    };
`;
