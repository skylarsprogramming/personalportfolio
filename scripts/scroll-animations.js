// Scroll-triggered reveal and subtle parallax effects
// Applies to all pages; respects reduced motion preference

const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

function setupReveal() {
  const candidates = document.querySelectorAll([
    '.hero-copy',
    '.section h2',
    '.section h1',
    '.section .section-desc',
    '.card',
    '.contact-list li',
    '.contact-form',
    '.video-frame',
    '.btn'
  ].join(','));

  const elements = Array.from(candidates);
  elements.forEach(el => el.classList.add('reveal-on-scroll'));

  if (prefersReducedMotion.matches) {
    elements.forEach(el => el.classList.add('in-view'));
    return;
  }

  const io = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.15, rootMargin: '0px 0px -10% 0px' });

  elements.forEach(el => io.observe(el));
}

function setupParallax() {
  if (prefersReducedMotion.matches) return;

  const parallaxItems = [];

  // Card media subtle drift
  document.querySelectorAll('.card .card-media').forEach(el => {
    parallaxItems.push({ el, speed: 0.05 });
  });

  // Video frame subtle movement
  const videoFrame = document.querySelector('.video-frame');
  if (videoFrame) {
    parallaxItems.push({ el: videoFrame, speed: 0.03 });
  }

  if (parallaxItems.length === 0) return;

  let ticking = false;
  function onScrollOrResize() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const viewportHeight = window.innerHeight;
      const viewportMiddle = window.scrollY + viewportHeight / 2;
      for (const item of parallaxItems) {
        const rect = item.el.getBoundingClientRect();
        const elementMiddle = window.scrollY + rect.top + rect.height / 2;
        const delta = (viewportMiddle - elementMiddle) * item.speed * 0.05;
        item.el.style.transform = `translateY(${delta.toFixed(2)}px)`;
      }
      ticking = false;
    });
  }

  window.addEventListener('scroll', onScrollOrResize, { passive: true });
  window.addEventListener('resize', onScrollOrResize, { passive: true });
  onScrollOrResize();
}

function init() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => { setupReveal(); setupParallax(); });
  } else {
    setupReveal();
    setupParallax();
  }
}

init();


