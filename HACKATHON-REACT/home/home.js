document.addEventListener('DOMContentLoaded', () => {
    
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const headerButtons = document.getElementById('header-buttons');
    // novo: alterna animação em X igual ao Blog
    const mainHeader = document.querySelector('.header');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = navMenu.classList.contains('active');

            if (isActive) {
                // FECHANDO O MENU
                navMenu.classList.remove('active');
                document.body.classList.remove('menu-open');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');

                // Devolve os botões para o header
                if (headerButtons) {
                    mainHeader.insertBefore(headerButtons, navToggle);
                }

            } else {
                // ABRINDO O MENU
                navMenu.classList.add('active');
                document.body.classList.add('menu-open'); // Bloqueia rolagem
                navToggle.classList.add('active');
                navToggle.setAttribute('aria-expanded', 'true');

                // Move os botões para dentro do menu
                if (headerButtons) {
                    navMenu.appendChild(headerButtons);
                }
            }
        });
    }

    // --- FUNCIONALIDADE DE ANIMAÇÃO DE ROLAGEM (Scroll Reveal) ---
    const revealElements = document.querySelectorAll('.video-section, .tendencias, .feedbacks');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });
    
    revealElements.forEach(element => {
        element.classList.add('reveal');
        revealObserver.observe(element);
    });

});

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