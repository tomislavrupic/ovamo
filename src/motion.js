// Small, progressive enhancements. Content remains visible without JavaScript.
const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
const candidates = '.section-heading, .workflow-heading, .workflow-step, .product-card, .story-copy, .identity-offer-copy, .identity-offer-card, .ai-teaser-copy, .ai-teaser-preview, .concept-section-heading, .concept-figure, .concept-world, .ai-section-heading, .ai-capabilities>article, .ai-routines>article, .ai-connect-options, .ai-connect-preview, .ai-rules-list>article, .ai-server-copy, .ai-server-map';
let observer;
let mutationObserver;
let frame = 0;
let scrollAttached = false;

function updateProgress() {
  frame = 0;
  const range = document.documentElement.scrollHeight - window.innerHeight;
  const progress = range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) : 0;
  document.documentElement.style.setProperty('--scroll-progress', String(progress));
}

function onScroll() {
  if (!frame) frame = window.requestAnimationFrame(updateProgress);
}

function observeElements(root = document) {
  root.querySelectorAll(candidates).forEach((element, index) => {
    if (element.dataset.motionSeen) return;
    element.dataset.motionSeen = 'true';
    // The first screen should render immediately. Reveal lower content as it arrives.
    if (element.getBoundingClientRect().top < window.innerHeight - 15) return;
    element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 45}ms`);
    element.classList.add('motion-pending');
    observer.observe(element);
  });
}

function enableMotion() {
  if (preference.matches || typeof IntersectionObserver === 'undefined') return;
  document.documentElement.classList.add('motion-ready');
  observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove('motion-pending');
      entry.target.classList.add('motion-arrived');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });
  observeElements();
  const grid = document.querySelector('#product-grid');
  if (grid && typeof MutationObserver !== 'undefined') {
    mutationObserver = new MutationObserver(() => observeElements(grid));
    mutationObserver.observe(grid, { childList: true });
  }
  if (!scrollAttached) {
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    scrollAttached = true;
  }
  updateProgress();
}

function disableMotion() {
  observer?.disconnect();
  mutationObserver?.disconnect();
  document.documentElement.classList.remove('motion-ready');
  document.querySelectorAll('.motion-pending').forEach(element => element.classList.remove('motion-pending'));
  window.removeEventListener('scroll', onScroll);
  window.removeEventListener('resize', onScroll);
  scrollAttached = false;
  if (frame) window.cancelAnimationFrame(frame);
  frame = 0;
}

preference.addEventListener?.('change', () => { disableMotion(); if (!preference.matches) enableMotion(); });
enableMotion();
