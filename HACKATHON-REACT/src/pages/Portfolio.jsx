import React, { useState, useEffect } from 'react';
import styles from './Portfolio.module.css';

// Importações das imagens principais
import logoImg from '../images/Logo padrão.png';

// Importações dos ícones
import instagramIcon from '../icons/instagram.png';
import whatsappIcon from '../icons/whatsapp.png';
import linkedinIcon from '../icons/linkedin.png';

export default function Portfolio({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [projectData, setProjectData] = useState({
    name: 'Projeto Hackathon',
    niche: 'Criação de site e Identidade Visual',
    description: 'Este projeto foi desenvolvido como parte do Hackathon da Infinity School...',
    participants: [
      { name: 'Usuário Um', url: 'https://github.com/usuario1', icon: 'fas fa-user' },
      { name: 'Usuário Dois', url: 'https://github.com/usuario2', icon: 'fas fa-user' }
    ],
    images: [],
    socialLinks: [
      { url: 'https://github.com/seu-usuario/repo-do-projeto', icon: 'fab fa-github' },
      { url: 'https://www.behance.net/seu-projeto', icon: 'fab fa-behance' }
    ]
  });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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

  // Função para alternar modo de edição
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  // Função para salvar alterações
  const saveChanges = () => {
    // Aqui você pode implementar a lógica para salvar no localStorage ou enviar para um servidor
    alert('Alterações salvas com sucesso!');
    setEditMode(false);
  };

  // Função para adicionar imagem
  const addImage = (imageUrl) => {
    if (imageUrl) {
      setProjectData(prev => ({
        ...prev,
        images: [...prev.images, imageUrl]
      }));
    }
  };

  // Função para remover imagem
  const removeImage = (index) => {
    setProjectData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  // Função para adicionar participante
  const addParticipant = (name, url) => {
    if (name && url) {
      setProjectData(prev => ({
        ...prev,
        participants: [...prev.participants, { name, url, icon: 'fas fa-user' }]
      }));
    }
  };

  // Função para remover participante
  const removeParticipant = (index) => {
    setProjectData(prev => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index)
    }));
  };

  // Função para adicionar link social
  const addSocialLink = (url) => {
    if (url) {
      const getIconForUrl = (url) => {
        if (url.includes('github.com')) return 'fab fa-github';
        if (url.includes('behance.net')) return 'fab fa-behance';
        if (url.includes('linkedin.com')) return 'fab fa-linkedin-in';
        if (url.includes('dribbble.com')) return 'fab fa-dribbble';
        if (url.includes('instagram.com')) return 'fab fa-instagram';
        return 'fas fa-link';
      };

      setProjectData(prev => ({
        ...prev,
        socialLinks: [...prev.socialLinks, { url, icon: getIconForUrl(url) }]
      }));
    }
  };

  // Função para remover link social
  const removeSocialLink = (index) => {
    setProjectData(prev => ({
      ...prev,
      socialLinks: prev.socialLinks.filter((_, i) => i !== index)
    }));
  };

  // Função para atualizar dados do projeto
  const updateProjectData = (field, value) => {
    setProjectData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Funções do carrossel
  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectData.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectData.images.length) % projectData.images.length);
  };

  // Fechar modal com ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && modalOpen) {
        closeModal();
      }
    };

    if (modalOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [modalOpen]);

  // Auto-play do carrossel
  useEffect(() => {
    if (!editMode && projectData.images.length > 1) {
      const interval = setInterval(nextImage, 4000);
      return () => clearInterval(interval);
    }
  }, [editMode, projectData.images.length, currentImageIndex]);

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
              <a href="#login" className={`${styles['header-btn']} ${styles['btn-login']}`}>Login</a>
              <a href="#cadastro" className={`${styles['header-btn']} ${styles['btn-cadastro']}`}>Cadastre-se</a>
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
            <a href="#login" className={`${styles['header-btn']} ${styles['btn-login']}`}>Login</a>
            <a href="#cadastro" className={`${styles['header-btn']} ${styles['btn-cadastro']}`}>Cadastre-se</a>
            <a href="#profile" className={styles['btn-user-icon']} aria-label="Perfil do usuário">
              <i className="fa-solid fa-user"></i>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <section className={styles['portfolio-project']}>
          <div className={styles.container}>
            {/* Controles de Edição */}
            <div className={`${styles['edit-mode-controls']} ${styles['text-end']} ${styles['mb-4']}`}>
              <button 
                onClick={toggleEditMode}
                className={`${styles.btn} ${styles['btn-secondary']}`}
              >
                <i className="fas fa-pencil-alt"></i> Modo Edição
              </button>
              {editMode && (
                <button 
                  onClick={saveChanges}
                  className={`${styles.btn} ${styles['btn-primary']} ${styles['ms-2']}`}
                >
                  <i className="fas fa-save"></i> Salvar Alterações
                </button>
              )}
            </div>

            {/* Nome do Projeto */}
            <div className={styles['project-name-container']}>
              {editMode ? (
                <input 
                  type="text" 
                  className={`${styles['form-control']} ${styles['project-title-input']}`}
                  value={projectData.name}
                  onChange={(e) => updateProjectData('name', e.target.value)}
                  style={{ 
                    fontSize: '48px', 
                    fontWeight: '700', 
                    textAlign: 'center', 
                    marginBottom: '40px',
                    background: 'transparent',
                    border: '2px solid var(--border-color)',
                    borderRadius: '5px',
                    color: 'var(--text-light)',
                    padding: '10px'
                  }}
                />
              ) : (
                <h1 className={styles['project-title']}>{projectData.name}</h1>
              )}
            </div>

            {/* Carrossel de Imagens */}
            {projectData.images.length > 0 && (
              <div className={`${styles['project-carousel']} ${styles['mb-5']}`} id="project-carousel">
                <div className={styles['carousel-inner']}>
                  <div className={`${styles['carousel-item']} ${styles.active}`}>
                    <div className={styles['carousel-item-square']}>
                      <img 
                        src={projectData.images[currentImageIndex]} 
                        alt={`Projeto ${projectData.name} - Imagem ${currentImageIndex + 1}`}
                      />
                      {editMode && (
                        <button 
                          className={styles['remove-btn']}
                          onClick={() => removeImage(currentImageIndex)}
                          style={{
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                            background: 'var(--primary-color)',
                            color: 'white',
                            border: 'none',
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            fontSize: '14px',
                            cursor: 'pointer',
                            zIndex: 1050
                          }}
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                {projectData.images.length > 1 && (
                  <>
                    <button 
                      className={styles['carousel-control-prev']} 
                      onClick={prevImage}
                    >
                      <span className={styles['carousel-control-prev-icon']} aria-hidden="true"></span>
                      <span className={styles['visually-hidden']}>Previous</span>
                    </button>
                    <button 
                      className={styles['carousel-control-next']} 
                      onClick={nextImage}
                    >
                      <span className={styles['carousel-control-next-icon']} aria-hidden="true"></span>
                      <span className={styles['visually-hidden']}>Next</span>
                    </button>
                  </>
                )}
              </div>
            )}

            {/* Controles de Edição do Carrossel */}
            {editMode && (
              <div className={`${styles['carousel-edit-controls']} ${styles['edit-controls']}`}>
                <label className={styles['form-label']}>Adicionar nova imagem:</label>
                <input 
                  type="file" 
                  className={`${styles['form-control']} ${styles['mb-2']}`} 
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        addImage(event.target.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <input 
                  type="text" 
                  className={`${styles['form-control']} ${styles['mb-2']}`}
                  placeholder="Ou cole a URL da imagem aqui"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      addImage(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-success']}`}
                  onClick={(e) => {
                    const input = e.target.previousElementSibling;
                    if (input.value) {
                      addImage(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Adicionar Imagem
                </button>
              </div>
            )}

            {/* Detalhes do Projeto */}
            <div className={styles['project-details']}>
              <div className={styles['project-niche-container']}>
                <p>
                  <strong>Nicho:</strong> 
                  {editMode ? (
                    <input 
                      type="text" 
                      className={styles['form-control']}
                      value={projectData.niche}
                      onChange={(e) => updateProjectData('niche', e.target.value)}
                      style={{
                        display: 'inline-block',
                        width: 'auto',
                        marginLeft: '10px',
                        background: 'transparent',
                        border: '1px solid var(--border-color)',
                        borderRadius: '3px',
                        color: 'var(--text-light)',
                        padding: '5px'
                      }}
                    />
                  ) : (
                    <span className={styles['project-niche']}> {projectData.niche}</span>
                  )}
                </p>
              </div>

              <div className={styles['project-participants-container']}>
                <p className={styles['mb-2']}><strong>Participantes:</strong></p>
                <div className={styles['participants-list']}>
                  {projectData.participants.map((participant, index) => (
                    <div key={index} className={styles['participant-item']}>
                      <a 
                        href={participant.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={styles['participant-link']}
                        style={{ position: 'relative' }}
                      >
                        <i className={`${participant.icon} ${styles['participant-icon']}`}></i>
                        {editMode && (
                          <button 
                            className={styles['remove-btn']}
                            onClick={(e) => {
                              e.preventDefault();
                              removeParticipant(index);
                            }}
                            style={{
                              position: 'absolute',
                              top: '-5px',
                              right: '-5px',
                              background: 'var(--primary-color)',
                              color: 'white',
                              border: 'none',
                              borderRadius: '50%',
                              width: '20px',
                              height: '20px',
                              fontSize: '12px',
                              cursor: 'pointer',
                              zIndex: 1050
                            }}
                          >
                            &times;
                          </button>
                        )}
                      </a>
                      <div className={styles['participant-name']}>{participant.name}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Controles de Edição de Participantes */}
              {editMode && (
                <div className={`${styles['participants-edit-controls']} ${styles['edit-controls']} ${styles['mt-2']}`}>
                  <input 
                    type="text" 
                    className={`${styles['form-control']} ${styles['mb-2']}`}
                    placeholder="Nome do participante"
                    id="participant-name-input"
                  />
                  <input 
                    type="text" 
                    className={`${styles['form-control']} ${styles['mb-2']}`}
                    placeholder="URL do perfil do participante"
                    id="participant-url-input"
                  />
                  <button 
                    className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-success']}`}
                    onClick={() => {
                      const nameInput = document.getElementById('participant-name-input');
                      const urlInput = document.getElementById('participant-url-input');
                      if (nameInput.value && urlInput.value) {
                        addParticipant(nameInput.value, urlInput.value);
                        nameInput.value = '';
                        urlInput.value = '';
                      } else {
                        alert('Por favor, preencha o nome e a URL do participante.');
                      }
                    }}
                  >
                    Adicionar Participante
                  </button>
                </div>
              )}

              <div className={`${styles['project-description-container']} ${styles['mt-4']}`}>
                <p className={styles['mb-2']}><strong>Descrição:</strong></p>
                {editMode ? (
                  <textarea 
                    className={styles['form-control']}
                    value={projectData.description}
                    onChange={(e) => updateProjectData('description', e.target.value)}
                    rows="5"
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--border-color)',
                      borderRadius: '5px',
                      color: 'var(--text-light)',
                      padding: '10px',
                      resize: 'vertical'
                    }}
                  />
                ) : (
                  <p className={styles['project-description']}>{projectData.description}</p>
                )}
              </div>
            </div>

            {/* Links do Portfólio */}
            <div className={`${styles['portfolio-links-section']} ${styles['portfolio-links']} ${styles['mt-5']}`}>
              <h2>Portfólio completo:</h2>
              <div className={`${styles['social-links-container']} ${styles['social-icons']}`}>
                {projectData.socialLinks.map((link, index) => (
                  <a 
                    key={index}
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles['social-link']}
                    style={{ position: 'relative' }}
                  >
                    <i className={link.icon}></i>
                    {editMode && (
                      <button 
                        className={styles['remove-btn']}
                        onClick={(e) => {
                          e.preventDefault();
                          removeSocialLink(index);
                        }}
                        style={{
                          position: 'absolute',
                          top: '-5px',
                          right: '-5px',
                          background: 'var(--primary-color)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '50%',
                          width: '20px',
                          height: '20px',
                          fontSize: '12px',
                          cursor: 'pointer',
                          zIndex: 1050
                        }}
                      >
                        &times;
                      </button>
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Controles de Edição de Links */}
            {editMode && (
              <div className={`${styles['links-edit-controls']} ${styles['edit-controls']} ${styles['mt-2']}`}>
                <input 
                  type="text" 
                  className={`${styles['form-control']} ${styles['mb-2']}`}
                  placeholder="Cole o link completo (GitHub, Behance, etc.)"
                  id="social-link-input"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && e.target.value) {
                      addSocialLink(e.target.value);
                      e.target.value = '';
                    }
                  }}
                />
                <button 
                  className={`${styles.btn} ${styles['btn-sm']} ${styles['btn-success']}`}
                  onClick={() => {
                    const input = document.getElementById('social-link-input');
                    if (input.value) {
                      addSocialLink(input.value);
                      input.value = '';
                    }
                  }}
                >
                  Adicionar Link
                </button>
              </div>
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
                atualizado.</p>

            <h2>Os anúncios</h2>
            <p>Tal como outros websites, coletamos e utilizamos informação contida nos anúncios. A informação contida
                nos anúncios inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider, como o
                Sapo, Clix ou outro), o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o
                Firefox), o tempo da sua visita e que páginas visitou dentro do nosso website.</p>

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
                você usa.</p>

            <h2>Como desativar cookies:</h2>
            <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a
                Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies
                afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies
                geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto,
                é recomendável que você não desative os cookies.</p>

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