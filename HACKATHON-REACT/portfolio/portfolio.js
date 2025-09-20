document.addEventListener('DOMContentLoaded', () => {

    // --- CÓDIGO PARA O MENU HAMBURGUER ---
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu'); // menu mobile existente

    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isActive);
        });
    }


    // --- LÓGICA DA PÁGINA DE PORTFÓLIO ---
    let projectData = {
        name: "Projeto Hackathon",
        images: [],
        niche: "Criação de site e Identidade Visual",
        participants: [
            { name: "Usuário Um", profileUrl: "https://github.com/usuario1" },
            { name: "Usuário Dois", profileUrl: "https://github.com/usuario2" }
        ],
        description: "Este projeto foi desenvolvido como parte do Hackathon da Infinity School...",
        links: ["https://github.com/seu-usuario/repo-do-projeto", "https://www.behance.net/seu-projeto"]
    };

    const projectCarousel = document.getElementById('project-carousel');
    const toggleEditModeBtn = document.getElementById('toggleEditMode');
    const saveChangesBtn = document.getElementById('saveChanges');
    const nameContainer = document.getElementById('project-name-container');
    const carouselContainer = document.getElementById('carousel-images-container');
    const nicheContainer = document.getElementById('project-niche-container');
    const participantsContainer = document.querySelector('.participants-list');
    const descriptionContainer = document.getElementById('project-description-container');
    const portfolioLinksSection = document.getElementById('portfolio-links-section');
    const linksContainer = document.getElementById('social-links-container');
    const carouselEdit = document.getElementById('carousel-edit-controls');
    const participantsEdit = document.getElementById('participants-edit-controls');
    const linksEdit = document.getElementById('links-edit-controls');
    let isEditMode = false;

    function renderProject() {
        nameContainer.innerHTML = `<h1 class="project-title">${projectData.name}</h1>`;
        nicheContainer.innerHTML = `<p><strong>Nicho:</strong> <span class="project-niche">${projectData.niche}</span></p>`;
        descriptionContainer.innerHTML = `<p class="mb-2"><strong>Descrição:</strong></p><p class="project-description">${projectData.description}</p>`;
        renderCarousel();
        renderParticipants();
        renderPortfolioLinks();
    }
    function renderCarousel() {
        if (projectData.images.length > 0) { projectCarousel.classList.remove('d-none'); } else { projectCarousel.classList.add('d-none'); return; }
        carouselContainer.innerHTML = '';
        projectData.images.forEach((url, index) => {
            const item = document.createElement('div');
            item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
            item.innerHTML = `<div class="carousel-item-square"><img src="${url}" class="d-block w-100" alt="Imagem ${index + 1} do projeto"></div>`;
            if (isEditMode) { item.innerHTML += `<button class="remove-btn" data-type="image" data-index="${index}">&times;</button>`; }
            carouselContainer.appendChild(item);
        });
    }
    function renderParticipants() {
        participantsContainer.innerHTML = '';
        projectData.participants.forEach((participant, index) => {
            const participantItem = document.createElement('div');
            participantItem.className = 'participant-item';
            const link = document.createElement('a');
            link.href = participant.profileUrl;
            link.target = '_blank';
            link.className = 'participant-link';
            link.innerHTML = `<i class="fas fa-user participant-icon"></i>`;
            if (isEditMode) { link.innerHTML += `<button class="remove-btn" data-type="participant" data-index="${index}">&times;</button>`; }
            const name = document.createElement('p');
            name.className = 'participant-name';
            name.textContent = participant.name;
            participantItem.appendChild(link);
            participantItem.appendChild(name);
            participantsContainer.appendChild(participantItem);
        });
    }
    function renderPortfolioLinks() {
        if (projectData.links.length === 0 && !isEditMode) { portfolioLinksSection.style.display = 'none'; } else { portfolioLinksSection.style.display = 'block'; }
        linksContainer.innerHTML = '';
        projectData.links.forEach((url, index) => {
            const iconClass = getIconForUrl(url);
            const link = document.createElement('a');
            link.href = url;
            link.target = '_blank';
            link.className = 'social-link';
            link.innerHTML = `<i class="${iconClass}"></i>`;
            if (isEditMode) { link.innerHTML += `<button class="remove-btn" data-type="link" data-index="${index}">&times;</button>`; }
            linksContainer.appendChild(link);
        });
    }
    function getIconForUrl(url) {
        if (!url) return 'fas fa-link';
        if (url.includes('github.com')) return 'fab fa-github';
        if (url.includes('behance.net')) return 'fab fa-behance';
        if (url.includes('linkedin.com')) return 'fab fa-linkedin-in';
        if (url.includes('dribbble.com')) return 'fab fa-dribbble';
        if (url.includes('instagram.com')) return 'fab fa-instagram';
        return 'fas fa-link';
    }
    function enableEditMode() {
        isEditMode = true;
        toggleEditModeBtn.classList.add('d-none');
        saveChangesBtn.classList.remove('d-none');
        carouselEdit.classList.remove('d-none');
        participantsEdit.classList.remove('d-none');
        linksEdit.classList.remove('d-none');
        nameContainer.innerHTML = `<input type="text" class="form-control" id="edit-name" value="${projectData.name}">`;
        nicheContainer.innerHTML = `<p><strong>Nicho:</strong> <input type="text" class="form-control" id="edit-niche" value="${projectData.niche}"></p>`;
        descriptionContainer.innerHTML = `<p class="mb-2"><strong>Descrição:</strong></p><textarea class="form-control" id="edit-description" rows="5">${projectData.description}</textarea>`;
        renderCarousel();
        renderParticipants();
        renderPortfolioLinks();
    }
    function disableEditMode(shouldSave) {
        isEditMode = false;
        if (shouldSave) {
            const editName = document.getElementById('edit-name');
            if (editName) projectData.name = editName.value;
            const editNiche = document.getElementById('edit-niche');
            if (editNiche) projectData.niche = editNiche.value;
            const editDesc = document.getElementById('edit-description');
            if (editDesc) projectData.description = editDesc.value;
        }
        toggleEditModeBtn.classList.remove('d-none');
        saveChangesBtn.classList.add('d-none');
        carouselEdit.classList.add('d-none');
        participantsEdit.classList.add('d-none');
        linksEdit.classList.add('d-none');
        renderProject();
    }
    toggleEditModeBtn.addEventListener('click', enableEditMode);
    saveChangesBtn.addEventListener('click', () => disableEditMode(true));
    document.getElementById('add-image-btn').addEventListener('click', () => {
        const fileInput = document.getElementById('new-image-file');
        const urlInput = document.getElementById('new-image-url');
        if (fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => { projectData.images.push(e.target.result); renderCarousel(); fileInput.value = ''; };
            reader.readAsDataURL(fileInput.files[0]);
        } else if (urlInput.value) {
            projectData.images.push(urlInput.value); renderCarousel(); urlInput.value = '';
        }
    });
    document.getElementById('add-participant-btn').addEventListener('click', () => {
        const nameInput = document.getElementById('new-participant-name');
        const urlInput = document.getElementById('new-participant-url');
        if (nameInput.value && urlInput.value) {
            projectData.participants.push({ name: nameInput.value, profileUrl: urlInput.value });
            renderParticipants();
            nameInput.value = ''; urlInput.value = '';
        } else {
            alert('Por favor, preencha o nome e a URL do participante.');
        }
    });
    document.getElementById('add-link-btn').addEventListener('click', () => {
        const input = document.getElementById('new-link-url');
        if (input.value) {
            projectData.links.push(input.value);
            renderPortfolioLinks();
            input.value = '';
        }
    });
    document.body.addEventListener('click', (event) => {
        if (event.target.matches('.remove-btn')) {
            event.preventDefault();
            const type = event.target.dataset.type;
            const index = parseInt(event.target.dataset.index, 10);
            if (confirm('Tem certeza que deseja remover este item?')) {
                if (type === 'image') { projectData.images.splice(index, 1); renderCarousel(); }
                if (type === 'participant') { projectData.participants.splice(index, 1); renderParticipants(); }
                if (type === 'link') { projectData.links.splice(index, 1); renderPortfolioLinks(); }
            }
        }
    });

    renderProject();
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

