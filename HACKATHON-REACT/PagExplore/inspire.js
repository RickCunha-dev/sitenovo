document.addEventListener('DOMContentLoaded', () => {
  // ===== Menu hambúrguer =====
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  // Busca e filtros
  let selectedCategory = 'todos';
  let searchTerm = '';

  function openMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.classList.add('active');
    navMenu.classList.add('active');
    document.body.classList.add('menu-open');
     injectMobileLogo();
  }

  function closeMenu() {
    if (!navToggle || !navMenu) return;
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      expanded ? closeMenu() : openMenu();
    });

    navMenu.addEventListener('click', (e) => {
      if (e.target.closest('a') || e.target.closest('.btn') || e.target.closest('.user-btn')) {
        closeMenu();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        closeMenu();
      }
    });
  }

  // ===== Filtro de categorias =====
  const botoesFiltro = document.querySelectorAll('.categoria-filtros button');
  const cards = document.querySelectorAll('.perfil-card');
  function applyFilters() {
    const term = searchTerm.trim().toLowerCase();
    cards.forEach(card => {
      const matchesCategory = (selectedCategory === 'todos') || (card.dataset.categoria === selectedCategory);
      let matchesSearch = true;
      if (term) {
        const info = card.querySelector('.perfil-info');
        const text = info ? info.textContent.toLowerCase() : '';
        matchesSearch = text.includes(term);
      }
      card.style.display = (matchesCategory && matchesSearch) ? 'block' : 'none';
    });
  }

  if (botoesFiltro.length && cards.length) {
    botoesFiltro.forEach(botao => {
      botao.addEventListener('click', () => {
        selectedCategory = botao.id.replace('-cat', '');
        applyFilters();
      });
    });
  }

  // ===== Busca por texto =====
  const searchForm = document.querySelector('.search-form');
  const searchInput = searchForm ? searchForm.querySelector('input') : null;
  if (searchForm && searchInput) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      searchTerm = searchInput.value || '';
      applyFilters();
    });
    searchInput.addEventListener('input', () => {
      searchTerm = searchInput.value || '';
      applyFilters();
    });
  }

  // ===== Modal Privacidade =====
  const modal = document.getElementById('modalPoliticas');
  const abrirModalBtn = document.getElementById('abrir-modal');
  const fecharModalBtn = document.getElementById('fechar-modal');
  if (modal && abrirModalBtn && fecharModalBtn) {
    abrirModalBtn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'flex';
    });
    fecharModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    window.addEventListener('click', (e) => {
      if (e.target === modal) modal.style.display = 'none';
    });
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') modal.style.display = 'none';
    });
  }

  // ===== Clonar botões Login / Cadastre-se e ícone usuário para menu mobile =====
  function syncMobileButtons() {
    if (!navMenu) return;
    const headerButtons = document.querySelector('.header-buttons');
    if (!headerButtons) return;
    const existingClones = navMenu.querySelectorAll('.__cloned');
    // Se largura > 768 e havia clones, removê-los
    if (window.innerWidth > 768) {
      if (existingClones.length) existingClones.forEach(c => c.remove());
      const injected = navMenu.querySelector('.mobile-logo-wrapper');
      if (injected) injected.remove();
      return;
    }
    // Mobile: se já existem clones, não duplicar
    if (existingClones.length) return;
    const originals = headerButtons.querySelectorAll('.btn, .user-btn');
    originals.forEach(el => {
      const clone = el.cloneNode(true);
      clone.classList.add('__cloned');
      navMenu.appendChild(clone);
    });
    // Centralização do ícone no menu mobile via CSS
  }

  window.addEventListener('resize', syncMobileButtons);
  syncMobileButtons();

  function injectMobileLogo() {
    if (window.innerWidth > 768 || !navMenu) return;
    if (navMenu.querySelector('.mobile-logo-wrapper')) return;
    const originalLogo = document.querySelector('.logo img');
    if (!originalLogo) return;
    const wrap = document.createElement('div');
    wrap.className = 'mobile-logo-wrapper';
    const img = originalLogo.cloneNode(true);
    img.removeAttribute('width');
    img.removeAttribute('height');
    wrap.appendChild(img);
    navMenu.prepend(wrap);
  }
});
