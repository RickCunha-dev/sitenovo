import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Profile.module.css';

// Importações das imagens principais
import logoImg from '../images/Logo padrão.png';

// Importações dos ícones
import instagramIcon from '../icons/instagram.png';
import whatsappIcon from '../icons/whatsapp.png';
import linkedinIcon from '../icons/linkedin.png';

export default function Profile({ onNavigate }) {
  const { isAuthenticated, user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [repoModalOpen, setRepoModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingRepo, setEditingRepo] = useState(null);

  // Verificar se o usuário está autenticado
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirecionar para login se não estiver autenticado
      onNavigate('login');
      return;
    }
  }, [isAuthenticated, onNavigate]);

  // Estados para o formulário de edição de perfil
  const [profileForm, setProfileForm] = useState({
    name: '',
    bio: '',
    jobTitle: '',
    company: '',
    location: '',
    education: '',
    extensionCourse: '',
    phone: '',
    birthDate: '',
    website: '',
    skills: '',
    social1: '',
    social2: '',
    social3: '',
    avatar: null
  });

  // Estados para o formulário de repositório
  const [repoForm, setRepoForm] = useState({
    id: '',
    name: '',
    description: '',
    link: '',
    image: null
  });

  // Estados para preview de imagens
  const [avatarPreview, setAvatarPreview] = useState('');
  const [repoImagePreview, setRepoImagePreview] = useState('');

  // Funções de mapeamento de ícones (do JS original)
  const skillToIconMap = {
    'html': 'devicon-html5-plain',
    'html5': 'devicon-html5-plain',
    'css': 'devicon-css3-plain',
    'css3': 'devicon-css3-plain',
    'javascript': 'devicon-javascript-plain',
    'js': 'devicon-javascript-plain',
    'react': 'devicon-react-original',
    'react native': 'devicon-react-original',
    'angular': 'devicon-angularjs-plain',
    'vue': 'devicon-vuejs-plain',
    'node.js': 'devicon-nodejs-plain',
    'nodejs': 'devicon-nodejs-plain',
    'python': 'devicon-python-plain',
    'java': 'devicon-java-plain',
    'c#': 'devicon-csharp-plain',
    'php': 'devicon-php-plain',
    'git': 'devicon-git-plain',
    'github': 'devicon-github-original',
    'figma': 'devicon-figma-plain',
    'docker': 'devicon-docker-plain',
    'sql': 'devicon-mysql-plain',
    'mysql': 'devicon-mysql-plain',
    'postgresql': 'devicon-postgresql-plain'
  };

  const socialDomainToIconMap = {
    'linkedin.com': 'fab fa-linkedin',
    'instagram.com': 'fab fa-instagram',
    'github.com': 'fab fa-github',
    'behance.net': 'fab fa-behance-square',
    'twitter.com': 'fab fa-twitter',
    'x.com': 'fab fa-twitter',
    'facebook.com': 'fab fa-facebook',
    'wa.me': 'fab fa-whatsapp',
    'whatsapp.com': 'fab fa-whatsapp'
  };

  // Função para converter arquivo para Base64 (do JS original)
  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  // Carregar dados do localStorage ou dados padrão
  const loadProfileAndRepos = async () => {
    setLoading(true);
    
    try {
      // Carregar perfil - usar dados do usuário autenticado como base
      const savedProfileData = localStorage.getItem('userProfile');
      if (savedProfileData) {
        const parsedData = JSON.parse(savedProfileData);
        // Mesclar com dados do usuário autenticado
        const mergedData = {
          ...parsedData,
          name: user?.nome_completo || parsedData.name,
          email: user?.email || parsedData.email,
          cpf: user?.cpf || parsedData.cpf
        };
        setUserData(mergedData);
      } else {
        // Dados padrão baseados no usuário autenticado
        const defaultUserData = {
          name: user?.nome_completo || 'Usuário',
          email: user?.email || '',
          cpf: user?.cpf || '',
          bio: 'Desenvolvedor apaixonado por tecnologia e inovação. Sempre em busca de novos desafios e oportunidades de aprendizado.',
          avatar_url: '/images/ricardo.jpeg',
          location: 'São Paulo, Brasil',
          company: 'Infinity School',
          website: '',
          jobTitle: 'Desenvolvedor',
          education: '',
          extensionCourse: '',
          phone: '',
          birthDate: '',
          skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Node.js'],
          socialLinks: ['', '', '']
        };
        setUserData(defaultUserData);
        localStorage.setItem('userProfile', JSON.stringify(defaultUserData));
      }

      // Carregar repositórios
      const savedReposData = localStorage.getItem('userRepositories');
      if (savedReposData) {
        setRepositories(JSON.parse(savedReposData));
      } else {
        // Repositórios padrão
        const defaultRepos = [
          {
            id: 'repo-1',
            name: 'E-commerce Platform',
            description: 'Plataforma completa de e-commerce desenvolvida com React e Node.js, incluindo sistema de pagamentos, carrinho de compras e dashboard administrativo.',
            image: '/images/app delivery.png',
            link: 'https://github.com/ricardo/ecommerce'
          },
          {
            id: 'repo-2',
            name: 'Task Manager App',
            description: 'Aplicativo de gerenciamento de tarefas com interface moderna e funcionalidades avançadas de organização.',
            image: '/images/sistema web.jpg',
            link: 'https://github.com/ricardo/task-manager'
          }
        ];
        setRepositories(defaultRepos);
        localStorage.setItem('userRepositories', JSON.stringify(defaultRepos));
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setTimeout(() => setLoading(false), 1500); // Simula carregamento
    }
  };

  // Salvar repositórios no localStorage
  const saveRepositories = (repos) => {
    try {
      localStorage.setItem('userRepositories', JSON.stringify(repos));
    } catch (error) {
      console.error("Erro ao salvar projetos:", error);
      alert("Não foi possível salvar os projetos. A imagem pode ser muito grande e excedeu o limite de armazenamento do navegador (geralmente 5-10MB). Tente com uma imagem menor.");
    }
  };

  useEffect(() => {
    loadProfileAndRepos();
  }, []);

  // Toggle do menu mobile
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Função para abrir modal de edição de perfil
  const openEditModal = () => {
    if (userData) {
      setProfileForm({
        name: userData.name || '',
        bio: userData.bio || '',
        jobTitle: userData.jobTitle || '',
        company: userData.company || '',
        location: userData.location || '',
        education: userData.education || '',
        extensionCourse: userData.extensionCourse || '',
        phone: userData.phone || '',
        birthDate: userData.birthDate || '',
        website: userData.website || '',
        skills: userData.skills?.join(', ') || '',
        social1: userData.socialLinks?.[0] || '',
        social2: userData.socialLinks?.[1] || '',
        social3: userData.socialLinks?.[2] || '',
        avatar: null
      });
      setAvatarPreview(userData.avatar_url || '');
    }
    setEditModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar modal de edição de perfil
  const closeEditModal = () => {
    setEditModalOpen(false);
    setProfileForm({
      name: '', bio: '', jobTitle: '', company: '', location: '',
      education: '', extensionCourse: '', phone: '', birthDate: '',
      website: '', skills: '', social1: '', social2: '', social3: '', avatar: null
    });
    setAvatarPreview('');
    document.body.style.overflow = 'auto';
  };

  // Função para abrir modal de repositório
  const openRepoModal = (repo = null) => {
    if (repo) {
      setEditingRepo(repo);
      setRepoForm({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        link: repo.link,
        image: null
      });
      setRepoImagePreview(repo.image || '');
    } else {
      setEditingRepo(null);
      setRepoForm({
        id: '',
        name: '',
        description: '',
        link: '',
        image: null
      });
      setRepoImagePreview('');
    }
    setRepoModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  // Função para fechar modal de repositório
  const closeRepoModal = () => {
    setRepoModalOpen(false);
    setEditingRepo(null);
    setRepoForm({ id: '', name: '', description: '', link: '', image: null });
    setRepoImagePreview('');
    document.body.style.overflow = 'auto';
  };

  // Função para adicionar novo projeto
  const addNewProject = () => {
    if (repositories.length >= 6) {
      alert("Você atingiu o limite de 6 projetos. Para adicionar um novo, por favor, remova um existente.");
      return;
    }
    openRepoModal();
  };

  // Handle de mudança no formulário de perfil
  const handleProfileFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'avatar' && files[0]) {
      setProfileForm(prev => ({ ...prev, avatar: files[0] }));
      const reader = new FileReader();
      reader.onload = (e) => setAvatarPreview(e.target.result);
      reader.readAsDataURL(files[0]);
    } else {
      setProfileForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Handle de mudança no formulário de repositório
  const handleRepoFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files[0]) {
      setRepoForm(prev => ({ ...prev, image: files[0] }));
      const reader = new FileReader();
      reader.onload = (e) => setRepoImagePreview(e.target.result);
      reader.readAsDataURL(files[0]);
    } else {
      setRepoForm(prev => ({ ...prev, [name]: value }));
    }
  };

  // Submit do formulário de perfil
  const handleProfileFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let avatarUrl = userData.avatar_url;
      if (profileForm.avatar) {
        avatarUrl = await toBase64(profileForm.avatar);
      }

      const skillsArray = profileForm.skills
        .split(',')
        .map(skill => skill.trim())
        .filter(Boolean);

      const socialLinks = [
        profileForm.social1,
        profileForm.social2,
        profileForm.social3
      ].filter(Boolean);

      const updatedUserData = {
        ...userData,
        avatar_url: avatarUrl,
        name: profileForm.name,
        bio: profileForm.bio,
        jobTitle: profileForm.jobTitle,
        company: profileForm.company,
        location: profileForm.location,
        education: profileForm.education,
        extensionCourse: profileForm.extensionCourse,
        phone: profileForm.phone,
        birthDate: profileForm.birthDate,
        website: profileForm.website,
        skills: skillsArray,
        socialLinks: socialLinks
      };

      localStorage.setItem('userProfile', JSON.stringify(updatedUserData));
      setUserData(updatedUserData);
      closeEditModal();
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar perfil:', error);
      alert('Erro ao salvar perfil. Tente novamente.');
    }
  };

  // Submit do formulário de repositório
  const handleRepoFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const id = repoForm.id || `repo-${Date.now()}`;
      let imageUrl = '';

      if (repoForm.image) {
        imageUrl = await toBase64(repoForm.image);
      } else if (editingRepo) {
        imageUrl = editingRepo.image;
      }

      const newRepo = {
        id,
        name: repoForm.name,
        description: repoForm.description,
        image: imageUrl,
        link: repoForm.link
      };

      let updatedRepos;
      if (editingRepo) {
        updatedRepos = repositories.map(repo => 
          repo.id === id ? newRepo : repo
        );
      } else {
        updatedRepos = [...repositories, newRepo];
      }

      setRepositories(updatedRepos);
      saveRepositories(updatedRepos);
      closeRepoModal();
      alert(editingRepo ? 'Projeto atualizado com sucesso!' : 'Projeto adicionado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar repositório:', error);
      alert('Erro ao salvar projeto. Tente novamente.');
    }
  };

  // Função para excluir projeto
  const deleteProject = (projectId, projectName) => {
    if (confirm(`Tem certeza que deseja excluir o projeto "${projectName}"?\n\nEsta ação não pode ser desfeita.`)) {
      const updatedRepos = repositories.filter(repo => repo.id !== projectId);
      setRepositories(updatedRepos);
      saveRepositories(updatedRepos);
      alert(`Projeto "${projectName}" foi excluído com sucesso!`);
    }
  };

  // Funções do modal de privacidade
  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Fechar modais com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (editModalOpen) closeEditModal();
        if (repoModalOpen) closeRepoModal();
        if (modalOpen) closeModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [editModalOpen, repoModalOpen, modalOpen]);

  // Função para renderizar skills com ícones
  const renderSkills = (skills) => {
    if (!skills || skills.length === 0) return null;
    
    return (
      <div className={styles['user-skills']}>
        {skills.map((skill, index) => {
          const skillKey = skill.trim().toLowerCase();
          const iconClass = skillToIconMap[skillKey] || 'fas fa-code';
          return (
            <span key={index} className={styles['skill-badge']}>
              <i className={iconClass}></i> {skill.trim()}
            </span>
          );
        })}
      </div>
    );
  };

  // Função para renderizar links sociais
  const renderSocialLinks = (socialLinks) => {
    if (!socialLinks || socialLinks.length === 0) return null;
    
    return (
      <div className={styles['user-social-links']}>
        {socialLinks.filter(link => link).map((link, index) => {
          let iconClass = 'fas fa-link';
          for (const domain in socialDomainToIconMap) {
            if (link.includes(domain)) {
              iconClass = socialDomainToIconMap[domain];
              break;
            }
          }
          return (
            <a key={index} href={link} target="_blank" rel="noopener noreferrer" aria-label="Link para rede social">
              <i className={iconClass}></i>
            </a>
          );
        })}
      </div>
    );
  };

  // Cleanup do scroll quando componente desmonta
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
      document.body.classList.remove('menu-open');
    };
  }, []);
  return (
    <div className={styles['page-wrapper']}>
      {/* Header */}
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logoImg} alt="Logo Infinity School" />
          </div>

          <nav className={styles['nav-links']}>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
          </nav>

          <div className={styles['header-right']}>
            <div className={styles['header-buttons']}>
              {isAuthenticated ? (
                <>
                  <span className={styles['user-greeting']}>
                    Olá, {user?.nome_completo?.split(' ')[0] || 'Usuário'}!
                  </span>
                  <a href="#logout" className={`${styles['header-btn']} ${styles['btn-logout']}`} 
                     onClick={(e) => { e.preventDefault(); logout(); onNavigate('home'); }}>
                    Sair
                  </a>
                </>
              ) : (
                <>
                  <a href="#login" className={`${styles['header-btn']} ${styles['btn-login']}`} 
                     onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
                  <a href="#cadastro" className={`${styles['header-btn']} ${styles['btn-cadastro']}`} 
                     onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
                </>
              )}
              <a href="#profile" className={styles['btn-user-icon']} aria-label="Perfil do usuário">
                <i className="fa-solid fa-user"></i>
              </a>
            </div>
            
            <button 
              className={`${styles['nav-toggle']} ${menuOpen ? styles.active : ''}`}
              onClick={toggleMenu}
              aria-label="Abrir menu"
              aria-expanded={menuOpen ? 'true' : 'false'}
            >
              <span className={styles.hamburger}></span>
              <span className={styles.hamburger}></span>
              <span className={styles.hamburger}></span>
            </button>
          </div>

          <div className={`${styles['mobile-menu']} ${menuOpen ? styles.active : ''}`}>
            <div className={styles['mobile-logo-wrapper']}>
              <img src={logoImg} alt="Logo Infinity School" />
            </div>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
            <hr className={styles['mobile-menu-divider']} />
            {isAuthenticated ? (
              <>
                <span className={styles['user-greeting']}>
                  Olá, {user?.nome_completo?.split(' ')[0] || 'Usuário'}!
                </span>
                <a href="#logout" className={`${styles['header-btn']} ${styles['btn-logout']}`} 
                   onClick={(e) => { e.preventDefault(); logout(); onNavigate('home'); }}>
                  Sair
                </a>
              </>
            ) : (
              <>
                <a href="#login" className={`${styles['header-btn']} ${styles['btn-login']}`} 
                   onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
                <a href="#cadastro" className={`${styles['header-btn']} ${styles['btn-cadastro']}`} 
                   onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
              </>
            )}
            <a href="#profile" className={styles['btn-user-icon']} aria-label="Perfil do usuário">
              <i className="fa-solid fa-user"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles['main-container']}>
        {/* Profile Sidebar */}
        <aside className={styles['profile-sidebar']}>
          {loading ? (
            <div className={styles.loader}></div>
          ) : userData ? (
            <div>
              <img 
                src={userData.avatar_url || ''} 
                alt={`Avatar de ${userData.name || ''}`} 
                className={styles['user-avatar']}
              />
              <div className={styles['user-info']}>
                <h1>{userData.name || 'Nome não definido'}</h1>
                <p>{userData.bio || 'Sem biografia.'}</p>
                
                {userData.jobTitle && (
                  <p><i className="fas fa-briefcase fa-fw"></i> {userData.jobTitle}</p>
                )}
                {userData.company && (
                  <p><i className="fas fa-building fa-fw"></i> {userData.company}</p>
                )}
                {userData.location && (
                  <p><i className="fas fa-map-marker-alt fa-fw"></i> {userData.location}</p>
                )}
                {userData.education && (
                  <p><i className="fas fa-graduation-cap fa-fw"></i> {userData.education}</p>
                )}
                {userData.extensionCourse && (
                  <p><i className="fas fa-book-open fa-fw"></i> {userData.extensionCourse}</p>
                )}
                {userData.phone && (
                  <p><i className="fas fa-phone fa-fw"></i> {userData.phone}</p>
                )}
                {userData.birthDate && (
                  <p><i className="fas fa-birthday-cake fa-fw"></i> {new Date(userData.birthDate).toLocaleDateString('pt-BR')}</p>
                )}
                {userData.website && (
                  <p>
                    <i className="fas fa-globe fa-fw"></i> 
                    <a href={userData.website} target="_blank" rel="noopener noreferrer">
                      {userData.website}
                    </a>
                  </p>
                )}
                
                {renderSocialLinks(userData.socialLinks)}
              </div>
              
              {renderSkills(userData.skills)}
              
              <button className={styles['edit-profile-btn']} onClick={openEditModal}>
                Editar Perfil
              </button>
            </div>
          ) : (
            <p style={{color: 'red'}}>Erro ao carregar perfil</p>
          )}
        </aside>

        {/* Main Content - Projects */}
        <section className={styles['main-content']}>
          <div className={styles['repo-header-container']}>
            <h2>Projetos Destaques</h2>
            <button 
              onClick={addNewProject}
              className={`${styles['header-btn']} ${styles['btn-cadastro']} ${styles['add-repo-btn']}`}
              style={{display: repositories.length >= 6 ? 'none' : 'block'}}
            >
              Adicionar Projeto
            </button>
          </div>
          
          <div className={styles['repo-list']}>
            {loading ? (
              <div className={styles.loader}></div>
            ) : repositories.length === 0 ? (
              <p>Nenhum projeto adicionado. Clique em "Adicionar Projeto" para começar.</p>
            ) : (
              repositories.map((repo) => (
                <div key={repo.id} className={styles['repo-card']}>
                  <div className={styles['repo-actions']}>
                    <button 
                      className={styles['edit-repo-btn']} 
                      onClick={() => openRepoModal(repo)}
                      aria-label="Editar projeto"
                    >
                      <i className="fas fa-pencil-alt"></i>
                    </button>
                    <button 
                      className={styles['delete-repo-btn']} 
                      onClick={() => deleteProject(repo.id, repo.name)}
                      aria-label="Excluir projeto"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                  </div>
                  
                  <a href={repo.link} target="_blank" rel="noopener noreferrer" className={styles['repo-link-image']}>
                    <div className={styles['repo-card-image-container']}>
                      <img src={repo.image || ''} alt={`Imagem do projeto ${repo.name}`} />
                    </div>
                  </a>
                  
                  <h3>
                    <a href={repo.link} target="_blank" rel="noopener noreferrer">
                      {repo.name}
                    </a>
                  </h3>
                  <p>{repo.description || 'Sem descrição.'}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles['footer-content']}>
            <div className={styles.logo}>
              <img src={logoImg} alt="Logo Infinity School" />
            </div>
            <div className={styles['footer-links']}>
              <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
              <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Explorar</a>
              <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
              <a href="#" onClick={openModal}>Privacidade</a>
            </div>
            <div className={styles['social-media']}>
              <span>Rede social</span>
              <div className={styles['social-icons']}>
                <a href="https://www.instagram.com/infinity.school/" className={styles['social-icon']}>
                  <img src={instagramIcon} alt="Instagram" />
                </a>
                <a href="#" className={styles['social-icon']}>
                  <img src={whatsappIcon} alt="WhatsApp" />
                </a>
                <a href="https://www.linkedin.com/company/infinityschool/posts/?feedView=all" className={styles['social-icon']}>
                  <img src={linkedinIcon} alt="LinkedIn" />
                </a>
              </div>
            </div>
          </div>
          <div className={styles['footer-bottom']}>
            <p>&copy; 2025 Infinity School. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Edição de Perfil */}
      {editModalOpen && (
        <div className={styles['modal-overlay']} onClick={closeEditModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <h2>Editar Perfil</h2>
            <form onSubmit={handleProfileFormSubmit}>
              <div className={styles['form-group']}>
                <label htmlFor="avatar">Foto de Perfil</label>
                <input 
                  type="file" 
                  id="avatar" 
                  name="avatar" 
                  accept="image/*"
                  onChange={handleProfileFormChange}
                />
                <div className={styles['image-preview-container']}>
                  {avatarPreview && (
                    <img 
                      src={avatarPreview} 
                      alt="Pré-visualização do avatar"
                      className={`${styles['image-preview']} ${styles['avatar-preview']}`}
                    />
                  )}
                </div>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="name">Nome</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  placeholder="Seu nome completo"
                  value={profileForm.name}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="bio">Bio</label>
                <textarea 
                  id="bio" 
                  name="bio" 
                  rows="3"
                  placeholder="Fale um pouco sobre você"
                  value={profileForm.bio}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="jobTitle">Cargo</label>
                <input 
                  type="text" 
                  id="jobTitle" 
                  name="jobTitle" 
                  placeholder="Ex: Desenvolvedor(a) Front-end"
                  value={profileForm.jobTitle}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="company">Empresa</label>
                <input 
                  type="text" 
                  id="company" 
                  name="company" 
                  placeholder="Onde você trabalha?"
                  value={profileForm.company}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="location">Localização</label>
                <input 
                  type="text" 
                  id="location" 
                  name="location" 
                  placeholder="Cidade, Estado"
                  value={profileForm.location}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="education">Formação Acadêmica</label>
                <input 
                  type="text" 
                  id="education" 
                  name="education" 
                  placeholder="Ex: Sistemas de Informação - FIAP"
                  value={profileForm.education}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="extensionCourse">Curso de Extensão</label>
                <input 
                  type="text" 
                  id="extensionCourse" 
                  name="extensionCourse" 
                  placeholder="Ex: React Avançado - Alura"
                  value={profileForm.extensionCourse}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="phone">Telefone</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  placeholder="(11) 99999-9999"
                  value={profileForm.phone}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="birthDate">Data de Nascimento</label>
                <input 
                  type="date" 
                  id="birthDate" 
                  name="birthDate"
                  value={profileForm.birthDate}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="website">Website</label>
                <input 
                  type="url" 
                  id="website" 
                  name="website" 
                  placeholder="https://seu-site.com"
                  value={profileForm.website}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="skills">Skills</label>
                <input 
                  type="text" 
                  id="skills" 
                  name="skills" 
                  placeholder="Separe as skills por vírgula: HTML, CSS, JS"
                  value={profileForm.skills}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="social1">Link Social 1</label>
                <input 
                  type="url" 
                  id="social1" 
                  name="social1" 
                  placeholder="URL do seu perfil social"
                  value={profileForm.social1}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="social2">Link Social 2</label>
                <input 
                  type="url" 
                  id="social2" 
                  name="social2" 
                  placeholder="URL do seu perfil social"
                  value={profileForm.social2}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="social3">Link Social 3</label>
                <input 
                  type="url" 
                  id="social3" 
                  name="social3" 
                  placeholder="URL do seu perfil social"
                  value={profileForm.social3}
                  onChange={handleProfileFormChange}
                />
              </div>

              <div className={styles['form-buttons']}>
                <button type="submit" className={styles['btn-save']}>Salvar</button>
                <button type="button" onClick={closeEditModal} className={styles['btn-cancel']}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Repositório */}
      {repoModalOpen && (
        <div className={styles['modal-overlay']} onClick={closeRepoModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <h2>{editingRepo ? 'Editar Projeto' : 'Adicionar Repositório'}</h2>
            <form onSubmit={handleRepoFormSubmit}>
              <div className={styles['form-group']}>
                <label htmlFor="repoName">Nome do Repositório</label>
                <input 
                  type="text" 
                  id="repoName" 
                  name="name" 
                  placeholder="Nome do seu projeto"
                  value={repoForm.name}
                  onChange={handleRepoFormChange}
                  required
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="repoDescription">Descrição</label>
                <textarea 
                  id="repoDescription" 
                  name="description" 
                  rows="3"
                  placeholder="Breve descrição do projeto"
                  value={repoForm.description}
                  onChange={handleRepoFormChange}
                />
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="repoImage">Imagem do Repositório (Upload)</label>
                <input 
                  type="file" 
                  id="repoImage" 
                  name="image" 
                  accept="image/*"
                  onChange={handleRepoFormChange}
                />
                <div className={styles['image-preview-container']}>
                  {repoImagePreview && (
                    <img 
                      src={repoImagePreview} 
                      alt="Pré-visualização da imagem"
                      className={styles['image-preview']}
                    />
                  )}
                </div>
              </div>

              <div className={styles['form-group']}>
                <label htmlFor="repoLink">Link do Repositório</label>
                <input 
                  type="url" 
                  id="repoLink" 
                  name="link" 
                  placeholder="https://link-do-seu-repositorio.com"
                  value={repoForm.link}
                  onChange={handleRepoFormChange}
                  required
                />
              </div>

              <div className={styles['form-buttons']}>
                <button type="submit" className={styles['btn-save']}>Salvar Repositório</button>
                <button type="button" onClick={closeRepoModal} className={styles['btn-cancel']}>Cancelar</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de Privacidade */}
      {modalOpen && (
        <div className={styles.modal} onClick={closeModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Política de Privacidade</h2>
            <p>Todas as suas informações pessoais recolhidas serão usadas para ajudar a tornar a sua visita no nosso
                site mais produtiva e o mais agradável possível. E a garantia da confidencialidade dos dados pessoais
                dos utilizadores do nosso site é muito importante para a Infinity School. Todas as informações pessoais
                relativas a membros, clientes ou visitantes que usem o site da Infinity School serão tratadas em
                concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro de 1998 (Lei n.º 67/98). As
                informações pessoais recolhidas podem incluir o seu nome, e-mail, número de telefone fixo e/ou celular,
                entre outros. O uso do site da Infinity School pressupõe a aceitação deste Acordo de Privacidade. A
                equipe da Infinity School reserva-se o direito de alterar este acordo sem aviso prévio. Deste modo,
                recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre
                atualizado.</p> <br />

            <h2>Os anúncios</h2>
            <p>Tal como outros websites, coletamos e utilizamos informação contida nos anúncios. A informação contida
                nos anúncios inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider, como o
                Sapo, Clix ou outro), o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o
                Firefox), o tempo da sua visita e que páginas visitou dentro do nosso website.</p> <br />

            <h2>Política de cookies Infinity School</h2>
            <h2>O que são cookies?</h2>
            <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos
            baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles
            coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como
            você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar'
            certos elementos da funcionalidade do site.</p>

            <h2>Como usamos os cookies?</h2>
            <p>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não
                existem opções padrão do setor para desativar os cookies sem desativar completamente a
                funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os
                cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que
                você usa.</p> <br />

            <h2>Como desativar cookies:</h2>
            <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a
                Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies
                afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies
                geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto,
                é recomendável que você não desative os cookies.</p> <br />

            <h2>Cookies que definimos:</h2>
            <p>Cookies relacionados a e-mail marketing: Este site oferece serviços de assinatura de e-mail marketing
                e os cookies podem ser usados para lembrar se você já está registrado e se deve mostrar determinadas
                notificações válidas apenas para usuários inscritos / não inscritos;
                Cookies relacionados a pesquisas: Periodicamente, oferecemos pesquisas e questionários para fornecer
                informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais
                precisão. Essas pesquisas podem usar cookies para lembrar quem já participou numa pesquisa ou para
                fornecer resultados precisos após a alteração das páginas;
                Cookies relacionados a formulários: Quando você envia dados por meio de um formulário como os
                encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser
                configurados para lembrar os detalhes do usuário para correspondência futura;
                Cookies de preferências do site: Para proporcionar uma ótima experiência neste site, fornecemos a
                funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para
                lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas
                sempre que você interagir com uma página for afetada por suas preferências.</p>
          </div>
        </div>
      )}
    </div>
  );
}