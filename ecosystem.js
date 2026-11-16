(() => {
  let language = localStorage.getItem('portfolio-language') === 'es' ? 'es' : 'en';
  const menu = document.getElementById('mobMenu');
  const toggle = document.getElementById('hamburger');
  function closeMenu() {
    if (!menu || !toggle) return;
    menu.hidden = true;
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
  function setLanguage(next) {
    language = next;
    document.documentElement.lang = next;
    localStorage.setItem('portfolio-language', next);
    document.querySelectorAll('[data-en][data-es]').forEach(element => {
      element.textContent = element.getAttribute(`data-${next}`) || '';
    });
    ['es', 'en'].forEach(code => {
      const button = document.getElementById(code === 'es' ? 'langEs' : 'langEn');
      if (!button) return;
      button.classList.toggle('active', code === next);
      button.setAttribute('aria-pressed', String(code === next));
    });
    if (toggle) toggle.setAttribute('aria-label', next === 'es' ? 'Abrir navegación' : 'Open navigation');
  }
  document.getElementById('langEs')?.addEventListener('click', () => setLanguage('es'));
  document.getElementById('langEn')?.addEventListener('click', () => setLanguage('en'));
  toggle?.addEventListener('click', () => {
    if (!menu) return;
    const open = menu.hidden;
    menu.hidden = !open;
    menu.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu && !menu.hidden) {
      closeMenu();
      toggle?.focus();
    }
  });
  menu?.querySelectorAll('a').forEach(anchor => anchor.addEventListener('click', closeMenu));
  setLanguage(language);
})();
