(function () {
  const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isFinePointer) return;

  document.querySelectorAll('.card').forEach((card) => {
    const removeRevealDelay = () => {
      card.style.transitionDelay = '0s';
    };

    card.addEventListener('mouseenter', removeRevealDelay);

    card.addEventListener('mousemove', (event) => {
      removeRevealDelay();

      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const rotateX = ((y / rect.height) - 0.5) * -8;
      const rotateY = ((x / rect.width)  - 0.5) *  8;

      card.style.transform =
        `translateY(-10px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
      card.style.setProperty('--mx', `${x}px`);
      card.style.setProperty('--my', `${y}px`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();
