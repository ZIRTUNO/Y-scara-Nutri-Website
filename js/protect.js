(function () {
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });

  document.addEventListener('keydown', function (e) {
    var k = (e.key || '').toLowerCase();
    var ctrl = e.ctrlKey || e.metaKey;
    if (
      e.key === 'F12' ||
      (ctrl && e.shiftKey && (k === 'i' || k === 'j' || k === 'c' || k === 'k')) ||
      (ctrl && (k === 'u' || k === 's' || k === 'p' || k === 'a'))
    ) {
      e.preventDefault();
    }
  });

  document.addEventListener('dragstart', function (e) {
    if (e.target && e.target.tagName === 'IMG') e.preventDefault();
  });

  ['copy', 'cut', 'selectstart'].forEach(function (evt) {
    document.addEventListener(evt, function (e) { e.preventDefault(); });
  });
})();
