(function () {
  const toggle = document.getElementById('menuToggle');
  const drawer = document.getElementById('mobileDrawer');
  if (!toggle || !drawer) return;

  const minScrollDuration = 1120;
  const maxScrollDuration = 1750;
  const scrollMsPerPixel = 0.38;
  let scrollFrame = 0;

  const close = () => {
    toggle.classList.remove('open');
    drawer.classList.remove('open');
    document.body.classList.remove('no-scroll');
  };

  const easeInOutCubic = (t) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const getTarget = (hash) => {
    if (!hash || hash.charAt(0) !== '#') return null;
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  };

  const setHash = (hash) => {
    if (window.history && window.history.pushState) {
      window.history.pushState(null, '', hash);
    } else {
      window.location.hash = hash;
    }
  };

  const scrollToSection = (target, hash) => {
    cancelAnimationFrame(scrollFrame);

    const startY = window.scrollY;
    const targetY = target.getBoundingClientRect().top + startY;
    const distance = targetY - startY;
    const duration = Math.min(
      maxScrollDuration,
      Math.max(minScrollDuration, Math.abs(distance) * scrollMsPerPixel)
    );
    const previousScrollBehavior = document.documentElement.style.scrollBehavior;

    document.documentElement.style.scrollBehavior = 'auto';

    if (Math.abs(distance) < 2) {
      window.scrollTo(0, targetY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      setHash(hash);
      return;
    }

    let startTime = 0;

    const step = (now) => {
      if (!startTime) startTime = now;

      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = easeInOutCubic(progress);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        scrollFrame = requestAnimationFrame(step);
      } else {
        document.documentElement.style.scrollBehavior = previousScrollBehavior;
        setHash(hash);
      }
    };

    scrollFrame = requestAnimationFrame(step);
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
    const hash = clickedNavLink && clickedNavLink.getAttribute('href');
    const target = getTarget(hash);

    if (target) {
      event.preventDefault();
      close();
      window.setTimeout(() => scrollToSection(target, hash), 80);
      return;
    }

    if (clickedBackdrop || clickedNavLink || clickedCta) close();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });
})();
