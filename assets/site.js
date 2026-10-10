const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#primary-nav');
function closeMenu() {
  menuButton.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}
menuButton.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('click', event => { if (!event.target.closest('.site-header')) closeMenu(); });
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') {
    closeMenu();
    menuButton.focus();
  }
});
matchMedia('(min-width: 781px)').addEventListener('change', closeMenu);
const viewer = document.querySelector('.lightbox');
let previousFocus;
for (const trigger of document.querySelectorAll('[data-lightbox]')) {
  trigger.addEventListener('click', event => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    previousFocus = trigger;
    const image = viewer.querySelector('img');
    image.src = trigger.href;
    image.alt = trigger.querySelector('img').alt;
    viewer.querySelector('p').textContent = trigger.dataset.caption;
    viewer.showModal();
    document.body.classList.add('no-scroll');
  });
}
viewer.querySelector('button').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => {
  document.body.classList.remove('no-scroll');
  previousFocus?.focus();
});
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
for (const clip of document.querySelectorAll('video[data-loop]')) {
  if (reducedMotion.matches) {
    clip.autoplay = false;
    clip.pause();
    clip.controls = true;
    continue;
  }
  clip.title = 'Click to pause or resume';
  clip.addEventListener('click', () => { if (clip.paused) clip.play(); else clip.pause(); });
}
