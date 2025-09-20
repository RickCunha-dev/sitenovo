document.addEventListener('DOMContentLoaded', () => {
    // --- ELEMENTOS DO DOM ---
    const userProfileElement = document.getElementById('user-profile');
    const repoListElement = document.getElementById('repo-list');
    const editModal = document.getElementById('edit-modal');
    const editForm = document.getElementById('edit-form');
    const cancelEditBtn = document.getElementById('cancel-btn');
    const avatarInput = document.getElementById('avatar');
    const avatarPreview = document.getElementById('avatar-preview');
    const nameInput = document.getElementById('name');
    const bioInput = document.getElementById('bio');
    const jobTitleInput = document.getElementById('job-title');
    const companyInput = document.getElementById('company');
    const locationInput = document.getElementById('location');
    const educationInput = document.getElementById('education');
    const extensionCourseInput = document.getElementById('extension-course');
    const phoneInput = document.getElementById('phone');
    const birthDateInput = document.getElementById('birth-date');
    const websiteInput = document.getElementById('website');
    const skillsInput = document.getElementById('skills');
    const socialInputs = document.querySelectorAll('input[id^="social"]');
    const addRepoBtn = document.getElementById('add-repo-btn');
    const repoModal = document.getElementById('repo-modal-overlay');
    const repoModalTitle = document.getElementById('repo-modal-title');
    const repoForm = document.getElementById('repo-form');
    const cancelRepoBtn = document.getElementById('cancel-repo-btn');
    const repoIdInput = document.getElementById('repo-id');
    const repoNameInput = document.getElementById('repo-name');
    const repoDescriptionInput = document.getElementById('repo-description');
    const repoImageUploadInput = document.getElementById('repo-image-upload');
    const repoImagePreview = document.getElementById('repo-image-preview');
    const repoLinkInput = document.getElementById('repo-link');
    const navToggle = document.getElementById('nav-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    // --- DICIONÁRIOS DE MAPEAMENTO ---
    const skillToIconMap = { 'html': 'devicon-html5-plain', 'html5': 'devicon-html5-plain', 'css': 'devicon-css3-plain', 'css3': 'devicon-css3-plain', 'javascript': 'devicon-javascript-plain', 'js': 'devicon-javascript-plain', 'react': 'devicon-react-original', 'react native': 'devicon-react-original', 'angular': 'devicon-angularjs-plain', 'vue': 'devicon-vuejs-plain', 'node.js': 'devicon-nodejs-plain', 'nodejs': 'devicon-nodejs-plain', 'python': 'devicon-python-plain', 'java': 'devicon-java-plain', 'c#': 'devicon-csharp-plain', 'php': 'devicon-php-plain', 'git': 'devicon-git-plain', 'github': 'devicon-github-original', 'figma': 'devicon-figma-plain', 'docker': 'devicon-docker-plain', 'sql': 'devicon-mysql-plain', 'mysql': 'devicon-mysql-plain', 'postgresql': 'devicon-postgresql-plain' };
    const defaultSkillIcon = 'fas fa-code';
    const socialDomainToIconMap = { 'linkedin.com': 'fab fa-linkedin', 'instagram.com': 'fab fa-instagram', 'github.com': 'fab fa-github', 'behance.net': 'fab fa-behance-square', 'twitter.com': 'fab fa-twitter', 'x.com': 'fab fa-twitter', 'facebook.com': 'fab fa-facebook', 'wa.me': 'fab fa-whatsapp', 'whatsapp.com': 'fab fa-whatsapp' };
    const defaultSocialIcon = 'fas fa-link';

    // --- ESTADO INICIAL ---
    let currentUserData = {};
    let userRepositories = [];

    // --- FUNÇÕES GERAIS ---
    const toBase64 = file => new Promise((resolve, reject) => { const reader = new FileReader(); reader.readAsDataURL(file); reader.onload = () => resolve(reader.result); reader.onerror = error => reject(error); });

    // --- FUNÇÕES DO MODAL DE PERFIL ---
    function openEditModal() {
        nameInput.value = currentUserData.name || ''; bioInput.value = currentUserData.bio || ''; companyInput.value = currentUserData.company || ''; locationInput.value = currentUserData.location || ''; websiteInput.value = currentUserData.website || ''; skillsInput.value = currentUserData.skills?.join(', ') || ''; socialInputs.forEach((input, index) => { input.value = currentUserData.socialLinks?.[index] || ''; });
        jobTitleInput.value = currentUserData.jobTitle || ''; educationInput.value = currentUserData.education || ''; extensionCourseInput.value = currentUserData.extensionCourse || ''; phoneInput.value = currentUserData.phone || ''; birthDateInput.value = currentUserData.birthDate || '';
        avatarPreview.src = currentUserData.avatar_url || ''; avatarPreview.style.display = currentUserData.avatar_url ? 'block' : 'none';
        editModal.classList.remove('hidden');
    }
    function closeEditModal() { editModal.classList.add('hidden'); }
    async function handleEditFormSubmit(event) {
        event.preventDefault();
        const avatarFile = avatarInput.files[0]; let avatarUrl = currentUserData.avatar_url; if (avatarFile) { avatarUrl = await toBase64(avatarFile); }
        const skillsArray = skillsInput.value.split(',').map(skill => skill.trim()).filter(Boolean);
        const socialLinks = Array.from(socialInputs).map(input => input.value).filter(Boolean);
        const updatedUserData = { ...currentUserData, avatar_url: avatarUrl, name: nameInput.value, bio: bioInput.value, company: companyInput.value, location: locationInput.value, website: websiteInput.value, skills: skillsArray, socialLinks: socialLinks, jobTitle: jobTitleInput.value, education: educationInput.value, extensionCourse: extensionCourseInput.value, phone: phoneInput.value, birthDate: birthDateInput.value };
        localStorage.setItem('userProfile', JSON.stringify(updatedUserData));
        displayUserData(updatedUserData);
        closeEditModal();
    }

    // --- FUNÇÕES DO MODAL DE REPOSITÓRIO ---
    function openRepoModal(repo = null) { repoForm.reset(); repoImagePreview.src = ''; repoImagePreview.style.display = 'none'; if (repo) { repoModalTitle.textContent = 'Editar Projeto'; repoIdInput.value = repo.id; repoNameInput.value = repo.name; repoDescriptionInput.value = repo.description; repoLinkInput.value = repo.link; if (repo.image) { repoImagePreview.src = repo.image; repoImagePreview.style.display = 'block'; } } else { repoModalTitle.textContent = 'Adicionar Projeto'; repoIdInput.value = ''; } repoModal.classList.remove('hidden'); }
    function closeRepoModal() { repoModal.classList.add('hidden'); }
    async function handleRepoFormSubmit(event) {
        event.preventDefault();
        const id = repoIdInput.value || `repo-${Date.now()}`; const name = repoNameInput.value; const description = repoDescriptionInput.value; const link = repoLinkInput.value; let imageUrl = '';
        const imageFile = repoImageUploadInput.files[0];
        if (imageFile) { imageUrl = await toBase64(imageFile); } else if (repoIdInput.value) { const originalRepo = userRepositories.find(repo => repo.id === id); imageUrl = originalRepo ? originalRepo.image : ''; }
        const newRepo = { id, name, description, image: imageUrl, link };
        if (repoIdInput.value) { userRepositories = userRepositories.map(repo => (repo.id === id ? newRepo : repo)); } else { userRepositories.push(newRepo); }
        saveRepositories(); displayRepositories(); closeRepoModal();
    }
    function deleteRepository(id) { if (confirm('Tem certeza que deseja excluir este projeto?')) { userRepositories = userRepositories.filter(repo => repo.id !== id); saveRepositories(); displayRepositories(); } }

    // --- FUNÇÕES DE CARREGAMENTO E EXIBIÇÃO ---
    function displayUserData(user) {
        currentUserData = user;
        const socialLinksHTML = (user.socialLinks && user.socialLinks.length > 0) ? `<div class="user-social-links">${user.socialLinks.filter(link => link).map(link => { let iconClass = defaultSocialIcon; for (const domain in socialDomainToIconMap) { if (link.includes(domain)) { iconClass = socialDomainToIconMap[domain]; break; } } return `<a href="${link}" target="_blank" rel="noopener noreferrer" aria-label="Link para rede social"><i class="${iconClass}"></i></a>`; }).join('')}</div>` : '';
        const skillsHTML = (user.skills && user.skills.length > 0) ? `<div class="user-skills">${user.skills.map(skill => { const skillKey = skill.trim().toLowerCase(); const iconClass = skillToIconMap[skillKey] || defaultSkillIcon; return `<span class="skill-badge"><i class="${iconClass}"></i> ${skill.trim()}</span>`; }).join('')}</div>` : '';
        let formattedBirthDate = ''; if (user.birthDate) { const [year, month, day] = user.birthDate.split('-'); formattedBirthDate = `${day}/${month}/${year}`; }
        const profileHTML = `<img src="${user.avatar_url || ''}" alt="Avatar de ${user.name || ''}" class="user-avatar"><div class="user-info"><h1>${user.name || 'Nome não definido'}</h1><p>${user.bio || 'Sem biografia.'}</p>${user.jobTitle ? `<p><i class="fas fa-briefcase fa-fw"></i> ${user.jobTitle}</p>` : ''}${user.company ? `<p><i class="fas fa-building fa-fw"></i> ${user.company}</p>` : ''}${user.location ? `<p><i class="fas fa-map-marker-alt fa-fw"></i> ${user.location}</p>` : ''}${user.education ? `<p><i class="fas fa-graduation-cap fa-fw"></i> ${user.education}</p>` : ''}${user.extensionCourse ? `<p><i class="fas fa-book-open fa-fw"></i> ${user.extensionCourse}</p>` : ''}${user.phone ? `<p><i class="fas fa-phone fa-fw"></i> ${user.phone}</p>` : ''}${formattedBirthDate ? `<p><i class="fas fa-birthday-cake fa-fw"></i> ${formattedBirthDate}</p>` : ''}${user.website ? `<p><i class="fas fa-globe fa-fw"></i> <a href="${user.website}" target="_blank" rel="noopener noreferrer">${user.website}</a></p>` : ''}${socialLinksHTML}</div>${skillsHTML}<button class="edit-profile-btn" id="edit-profile-btn">Editar Perfil</button>`;
        userProfileElement.innerHTML = profileHTML;
        document.getElementById('edit-profile-btn').addEventListener('click', openEditModal);
    }

    function displayRepositories() {
        // NOVO: Verifica o número de projetos e controla a visibilidade do botão "Adicionar Projeto"
        if (userRepositories.length >= 6) {
            addRepoBtn.style.display = 'none'; // Esconde o botão se o limite for atingido
        } else {
            addRepoBtn.style.display = 'block'; // Mostra o botão se houver espaço
        }

        if (userRepositories.length === 0) {
            repoListElement.innerHTML = '<p>Nenhum projeto adicionado. Clique em "Adicionar Projeto" para começar.</p>';
            return;
        }

        repoListElement.innerHTML = userRepositories.map(repo => `<div class="repo-card"><div class="repo-actions"><button class="edit-repo-btn" data-repo-id="${repo.id}" aria-label="Editar projeto"><i class="fas fa-pencil-alt"></i></button><button class="delete-repo-btn" data-repo-id="${repo.id}" aria-label="Excluir projeto"><i class="fas fa-trash-alt"></i></button></div><a href="${repo.link}" target="_blank" rel="noopener noreferrer" class="repo-link-image"><div class="repo-card-image-container"><img src="${repo.image || ''}" alt="Imagem do projeto ${repo.name}"></div></a><h3><a href="${repo.link}" target="_blank" rel="noopener noreferrer">${repo.name}</a></h3><p>${repo.description || 'Sem descrição.'}</p></div>`).join('');
        
        document.querySelectorAll('.edit-repo-btn').forEach(button => button.addEventListener('click', (e) => { const repoId = e.currentTarget.dataset.repoId; const repoToEdit = userRepositories.find(repo => repo.id === repoId); if (repoToEdit) openRepoModal(repoToEdit); }));
        document.querySelectorAll('.delete-repo-btn').forEach(button => button.addEventListener('click', (e) => { const repoId = e.currentTarget.dataset.repoId; deleteRepository(repoId); }));
    }

    function saveRepositories() { try { localStorage.setItem('userRepositories', JSON.stringify(userRepositories)); } catch (error) { console.error("Erro ao salvar projetos:", error); alert("Não foi possível salvar os projetos. A imagem pode ser muito grande e excedeu o limite de armazenamento do navegador (geralmente 5-10MB). Tente com uma imagem menor."); } }
    
    async function loadProfileAndRepos() {
        const savedProfileData = localStorage.getItem('userProfile'); if (savedProfileData) { currentUserData = JSON.parse(savedProfileData); displayUserData(currentUserData); } else { try { userProfileElement.innerHTML = '<div class="loader"></div>'; const userResponse = await fetch(`https://api.github.com/users/octocat`); if (!userResponse.ok) throw new Error('Usuário padrão não encontrado!'); currentUserData = await userResponse.json(); currentUserData.skills = ['HTML5', 'JavaScript', 'Git', 'GitHub']; localStorage.setItem('userProfile', JSON.stringify(currentUserData)); displayUserData(currentUserData); } catch (error) { userProfileElement.innerHTML = `<p style="color: red;">${error.message}</p>`; } }
        const savedReposData = localStorage.getItem('userRepositories'); if (savedReposData) { userRepositories = JSON.parse(savedReposData); } else { userRepositories = [{ id: 'repo-1', name: 'Spoon-Knife', description: 'Este é um projeto de demonstração.', image: '', link: '#' }, { id: 'repo-2', name: 'Hello-World', description: 'Meu primeiro projeto no GitHub!', image: '', link: '#' },]; localStorage.setItem('userRepositories', JSON.stringify(userRepositories)); }
        displayRepositories();
    }
    
    // --- LÓGICA DO MENU HAMBURGUER (PORTFOLIO STYLE) ---
    if (navToggle && mobileMenu) {
        navToggle.addEventListener('click', () => {
            const isActive = mobileMenu.classList.toggle('active');
            navToggle.classList.toggle('active', isActive);
            navToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
            document.body.classList.toggle('menu-open', isActive);
        });
    }

    // --- INICIALIZAÇÃO E EVENT LISTENERS ---
    avatarInput.addEventListener('change', (event) => { const file = event.target.files[0]; if (file && avatarPreview) { const reader = new FileReader(); reader.onload = (e) => { avatarPreview.src = e.target.result; avatarPreview.style.display = 'block'; }; reader.readAsDataURL(file); } });
    repoImageUploadInput.addEventListener('change', (event) => { const file = event.target.files[0]; if (file) { const reader = new FileReader(); reader.onload = (e) => { repoImagePreview.src = e.target.result; repoImagePreview.style.display = 'block'; }; reader.readAsDataURL(file); } });
    
    // NOVO: Adiciona a verificação de limite ao clicar no botão
    addRepoBtn.addEventListener('click', () => {
        if (userRepositories.length >= 6) {
            alert("Você atingiu o limite de 6 projetos. Para adicionar um novo, por favor, remova um existente.");
            return; // Impede que o modal seja aberto
        }
        openRepoModal();
    });

    cancelRepoBtn.addEventListener('click', closeRepoModal);
    repoForm.addEventListener('submit', handleRepoFormSubmit);
    cancelEditBtn.addEventListener('click', closeEditModal);
    editForm.addEventListener('submit', handleEditFormSubmit);
    loadProfileAndRepos();
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