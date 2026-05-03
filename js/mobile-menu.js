(function () {
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggle || !drawer) return;

  const close = () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.toggle('open');
    drawer.classList.toggle('open', isOpen);
    document.body.classList.toggle('no-scroll', isOpen);
  });

  drawer.addEventListener('click', (event) => {
    const clickedBackdrop = event.target === drawer;
    const clickedNavLink  = event.target.closest('[data-close]');
    const clickedCta      = event.target.classList.contains('drawer-cta');

    if (clickedBackdrop || clickedNavLink || clickedCta) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
})();
