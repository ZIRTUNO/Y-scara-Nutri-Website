(function () {
  const heroImg = document.querySelector('.hero-img');
  if (!heroImg) return;

  const supported = window.matchMedia('(hover: hover) and (min-width: 981px)').matches;
  if (!supported) return;

  document.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth  - 0.5) * 6;
    const y = (event.clientY / window.innerHeight - 0.5) * 4;
    heroImg.style.transform = `rotateY(${-6 + x}deg) rotateX(${2 + y}deg)`;
  });
})();
