(function () {
  const hero = document.querySelector('.hero-grid');
  const heroImg = document.querySelector('.hero-img');
  if (!hero || !heroImg) return;

  const supported = window.matchMedia('(hover: hover) and (min-width: 981px)').matches;
  if (!supported) return;

  const reset = () => {
    heroImg.style.transform = '';
  };

  hero.addEventListener('pointermove', (event) => {
    const rect = hero.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 5;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 3;
    heroImg.style.transform = `rotateY(${-6 + x}deg) rotateX(${2 + y}deg) translateZ(0)`;
  });

  hero.addEventListener('pointerleave', reset);
})();
