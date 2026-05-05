(function () {
  const marquee = document.querySelector('.marquee');
  const track = document.querySelector('.marquee-track');
  if (!marquee || !track) return;

  const sourceItems = Array.from(track.children).map((child) => child.cloneNode(true));
  if (!sourceItems.length) return;

  let resizeFrame = 0;

  function appendSource(group) {
    sourceItems.forEach((item) => {
      group.appendChild(item.cloneNode(true));
    });
  }

  function buildGroup() {
    const group = document.createElement('div');
    group.className = 'marquee-group';
    appendSource(group);
    return group;
  }

  function rebuild() {
    track.style.animation = 'none';
    track.textContent = '';

    const group = buildGroup();
    track.appendChild(group);

    let guard = 0;
    while (group.scrollWidth < marquee.offsetWidth && guard < 12) {
      appendSource(group);
      guard += 1;
    }

    track.appendChild(group.cloneNode(true));

    const seconds = Math.max(34, group.scrollWidth / 38);
    track.style.setProperty('--marquee-duration', `${seconds}s`);

    requestAnimationFrame(() => {
      track.style.animation = '';
    });
  }

  function scheduleRebuild() {
    cancelAnimationFrame(resizeFrame);
    resizeFrame = requestAnimationFrame(rebuild);
  }

  rebuild();
  window.addEventListener('resize', scheduleRebuild, { passive: true });

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(rebuild);
  }
})();
