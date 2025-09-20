document.addEventListener('DOMContentLoaded', () => {
  const toggleIcons = document.querySelectorAll('.input-olho .olhinho');
  if (!toggleIcons.length) return;

  toggleIcons.forEach(icon => {
    const input = icon.previousElementSibling;
    if (!input) return;

    // Acessibilidade básica
    icon.setAttribute('role', 'button');
    icon.setAttribute('tabindex', '0');
    icon.setAttribute('aria-label', 'Mostrar senha');

    function swapIcon(isVisible) {
      const src = icon.getAttribute('src') || '';
      const openSrc = src.includes('olhofechado')
        ? src.replace('olhofechado', 'olhoaberto')
        : '../Icones/olhoaberto.png';
      const closedSrc = src.includes('olhoaberto')
        ? src.replace('olhoaberto', 'olhofechado')
        : '../Icones/olhofechado.png';

      icon.src = isVisible ? openSrc : closedSrc;
      icon.alt = isVisible ? 'Ocultar senha' : 'Mostrar senha';
      icon.setAttribute('aria-pressed', isVisible ? 'true' : 'false');
      icon.setAttribute('aria-label', isVisible ? 'Ocultar senha' : 'Mostrar senha');
    }

    function toggle() {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      swapIcon(isHidden);
    }

    icon.addEventListener('click', toggle);
    icon.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle();
      }
    });
  });
});
