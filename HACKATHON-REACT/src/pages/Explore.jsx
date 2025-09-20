import React, { useState, useEffect } from 'react';
import styles from './Explore.module.css';

// Importações das imagens principais
import logoImg from '../images/Logo padrão.png';

// Importações dos ícones
import instagramIcon from '../icons/instagram.png';
import whatsappIcon from '../icons/whatsapp.png';
import linkedinIcon from '../icons/linkedin.png';

// Importando as imagens dos portfólios
import sistemaWebImg from '/images/sistema web.jpg';
import identidadeVisualImg from '/images/identidade visual.jpg';
import appDeliveryImg from '/images/app delivery.png';
import appDelivery2Img from '/images/app delivery 2.png';
import producaoVideoImg from '/images/producao de video.jpg';
import campanhaDigitalImg from '/images/campanha digital.webp';
import ensaioFotograficoImg from '/images/ensaio fotografico.jpeg';
import identidadeVisual2Img from '/images/identidade visual 2.png';
import criacaoLogoImg from '/images/criacao de logo.png';
import hackathonImg from '/images/HACKATHON.jpg';

const portfolioData = [
  {
    id: 1,
    categoria: 'dev',
    projeto: 'Sistema Web',
    profissional: 'João Silva',
    imagem: sistemaWebImg
  },
  {
    id: 2,
    categoria: 'designer',
    projeto: 'Identidade Visual',
    profissional: 'Maria Oliveira',
    imagem: identidadeVisualImg
  },
  {
    id: 3,
    categoria: 'ux-ui',
    projeto: 'App Delivery',
    profissional: 'Lucas Andrade',
    imagem: appDeliveryImg
  },
  {
    id: 4,
    categoria: 'ux-ui',
    projeto: 'App Delivery',
    profissional: 'Thiago Silva',
    imagem: appDelivery2Img
  },
  {
    id: 5,
    categoria: 'video-maker',
    projeto: 'Produção de Video',
    profissional: 'Jhonathan Santos',
    imagem: producaoVideoImg
  },
  {
    id: 6,
    categoria: 'marketing',
    projeto: 'Campanha Digital',
    profissional: 'Ana Costa',
    imagem: campanhaDigitalImg
  },
  {
    id: 7,
    categoria: 'fotografo',
    projeto: 'Ensaio Fotográfico',
    profissional: 'Pedro Rocha',
    imagem: ensaioFotograficoImg
  },
  {
    id: 8,
    categoria: 'video-maker',
    projeto: 'Identidade Visual',
    profissional: 'Pablo Silva',
    imagem: identidadeVisual2Img
  },
  {
    id: 9,
    categoria: 'video-maker',
    projeto: 'Produção de Vídeo',
    profissional: 'Juliana Martins',
    imagem: criacaoLogoImg
  },
  {
    id: 10,
    categoria: 'dev',
    projeto: 'HACKATHON',
    profissional: 'Clinton Rodrigo',
    imagem: hackathonImg
  }
];

export default function Explore({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPortfolios, setFilteredPortfolios] = useState(portfolioData);

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

  // Funções do modal
  const openModal = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
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

  // Aplicar filtros
  useEffect(() => {
    const filtered = portfolioData.filter(portfolio => {
      const matchesCategory = selectedCategory === 'todos' || portfolio.categoria === selectedCategory;
      const matchesSearch = searchTerm === '' || 
        portfolio.projeto.toLowerCase().includes(searchTerm.toLowerCase()) ||
        portfolio.profissional.toLowerCase().includes(searchTerm.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
    
    setFilteredPortfolios(filtered);
  }, [selectedCategory, searchTerm]);

  // Lidar com mudança de categoria
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  // Lidar com busca
  const handleSearch = (e) => {
    e.preventDefault();
    // A busca já é aplicada automaticamente através do useEffect
  };

  const handleSearchInput = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      {/* Header */}
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logoImg} alt="Logo Infinity School" />
          </div>

          <nav className={`${styles['nav-menu']} ${menuOpen ? styles.active : ''}`}>
            <div className={styles['mobile-logo']}>
              <img src={logoImg} alt="Logo Infinity School" />
            </div>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <a href="#explorar">Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
            
            <div className={styles['header-buttons']}>
              <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
              <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
              <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário"
                 onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>
                <i className="fa-solid fa-user"></i>
              </a>
            </div>
          </nav>

          <div className={styles['header-buttons']}>
            <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
            <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
            <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário"
               onClick={(e) => { e.preventDefault(); onNavigate('portfolio'); }}>
              <i className="fa-solid fa-user"></i>
            </a>
          </div>

          <button 
            className={`${styles['nav-toggle']} ${menuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
            aria-expanded={menuOpen}
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <div className={styles.carrossel}>
          <div className={styles.titulo}>
            <h1>Inspire-se em quem já está brilhando</h1>
          </div>
          <div className={styles.paragrafo}>
            <p>Explore uma seleção de <span>portifólios</span> criados por <span>profissionais</span> talentosos.
              Veja na prática como nossa plataforma
              pode transformar a <span>apresentação</span> do seu <span>trabalho</span> e abrir portas para novas
              oportunidades.</p>
          </div>
        </div>

        {/* Logo Explorar */}
        <div className={styles['logo-explorar']}>
          <h3><a href="#explorar" onClick={(e) => e.preventDefault()}>Explorar</a></h3>
        </div>

        {/* Search Section */}
        <div className={styles['nav-explorar']}>
          <div className={styles['search-container']}>
            <form className={styles['search-form']} onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Pesquisar" 
                aria-label="Pesquisa"
                value={searchTerm}
                onChange={handleSearchInput}
              />
              <button className={styles.lupa} type="submit">
                <span className="material-icons">search</span>
              </button>
            </form>
          </div>
        </div>

        {/* Category Filters */}
        <div className={styles['categoria-filtros']}>
          <button 
            className={selectedCategory === 'todos' ? styles.active : ''}
            onClick={() => handleCategoryChange('todos')}
          >
            Todos
          </button>
          <button 
            className={selectedCategory === 'designer' ? styles.active : ''}
            onClick={() => handleCategoryChange('designer')}
          >
            Designer
          </button>
          <button 
            className={selectedCategory === 'ux-ui' ? styles.active : ''}
            onClick={() => handleCategoryChange('ux-ui')}
          >
            UX/UI
          </button>
          <button 
            className={selectedCategory === 'dev' ? styles.active : ''}
            onClick={() => handleCategoryChange('dev')}
          >
            Dev
          </button>
          <button 
            className={selectedCategory === 'fotografo' ? styles.active : ''}
            onClick={() => handleCategoryChange('fotografo')}
          >
            Fotógrafo
          </button>
          <button 
            className={selectedCategory === 'marketing' ? styles.active : ''}
            onClick={() => handleCategoryChange('marketing')}
          >
            Marketing
          </button>
          <button 
            className={selectedCategory === 'video-maker' ? styles.active : ''}
            onClick={() => handleCategoryChange('video-maker')}
          >
            Video Maker
          </button>
        </div>

        {/* Portfolio Grid */}
        <section className={styles['perfil-grid']}>
          {filteredPortfolios.map(portfolio => (
            <article key={portfolio.id} className={styles['perfil-card']} data-categoria={portfolio.categoria}>
              <img src={portfolio.imagem} alt={`Imagem do ${portfolio.projeto}`} />
              <div className={styles['perfil-info']}>
                <p><strong>Projeto:</strong> {portfolio.projeto}</p>
                <p><strong>Profissional:</strong><a href="#"> {portfolio.profissional}</a></p>
              </div>
            </article>
          ))}
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
              <a href="#explorar">Explorar</a>
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
            certos elementos da funcionalidade do site.</p> <br />

            <h2>Como usamos os cookies?</h2>
            <p>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem
                opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os
                recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver
                certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que você usa.</p>
          </div>
        </div>
      )}
    </div>
  );
}