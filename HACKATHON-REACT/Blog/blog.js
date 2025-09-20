document.addEventListener('DOMContentLoaded', () => {
    // ===== Menu hambúrguer =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

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

        // Fechar ao clicar em qualquer link/botão dentro do menu
        navMenu.addEventListener('click', (e) => {
            if (e.target.closest('a') || e.target.closest('.btn') || e.target.closest('.user-btn')) {
                closeMenu();
            }
        });

        // Fechar com ESC
        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                closeMenu();
            }
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
            if (window.innerWidth > 768) {
                if (existingClones.length) existingClones.forEach(c => c.remove());
                // Remover logo injetada
                const injected = navMenu.querySelector('.mobile-logo-wrapper');
                if (injected) injected.remove();
                return;
            }
            if (existingClones.length) return;
            // Ordem: botões (.btn) depois ícone (.user-btn)
            const originals = headerButtons.querySelectorAll('.btn, .user-btn');
            originals.forEach(el => {
                const clone = el.cloneNode(true);
                clone.classList.add('__cloned');
                navMenu.appendChild(clone);
            });
            // Centralizar ícone (assumindo último é user-btn)
            // Centralização do ícone tratada via CSS (media query)
        }

    function injectMobileLogo() {
        if (window.innerWidth > 768 || !navMenu) return;
        if (navMenu.querySelector('.mobile-logo-wrapper')) return; // já existe
        const originalLogo = document.querySelector('.logo img');
        if (!originalLogo) return;
        const wrap = document.createElement('div');
        wrap.className = 'mobile-logo-wrapper';
        const img = originalLogo.cloneNode(true);
        img.removeAttribute('width');
        img.removeAttribute('height');
        wrap.appendChild(img);
        // Inserir logo no topo do menu
        navMenu.prepend(wrap);
    }

    window.addEventListener('resize', syncMobileButtons);
    syncMobileButtons();
});

