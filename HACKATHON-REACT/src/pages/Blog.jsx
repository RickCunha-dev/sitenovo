import React, { useState } from 'react';
import styles from './Blog.module.css';

// Importações das imagens
import logoImg from '../images/Logo padrão.png';

const Blog = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  const toggleMenu = () => {
    const newMenuState = !isMenuOpen;
    setIsMenuOpen(newMenuState);
    
    // Controlar scroll do body
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  const openPrivacyModal = () => {
    setIsPrivacyModalOpen(true);
  };

  const closePrivacyModal = () => {
    setIsPrivacyModalOpen(false);
  };

  const blogArticles = [
    {
      id: 1,
      title: "Como Criar um portfólio profissional em 5 passos",
      image: "/imagens_blog/exame.png",
      link: "https://exame.com/carreira/guia-de-carreira/5-dicas-para-criar-um-portfolio-profissional-atraente/?utm_source=chatgpt.com"
    },
    {
      id: 2,
      title: "Portfólio: porquê e quando é importante ter um",
      image: "/imagens_blog/getninjas.png",
      link: "https://blog.getninjas.com.br/portfolio-porque-e-quando-e-importante-ter-um/"
    },
    {
      id: 3,
      title: "Melhores plataformas para criar seu portfólio gratuito",
      image: "/imagens_blog/glassdoor.png",
      link: "https://www.glassdoor.com.br/blog/5-sites-gratuitos-para-criar-portfolio-online/?utm_source=chatgpt.com"
    },
    {
      id: 4,
      title: "Dicas de especialistas para escrever uma descrição de projeto com modelos gratuitos",
      image: "/imagens_blog/smartsheet.png",
      link: "https://pt.smartsheet.com/content/project-description"
    },
    {
      id: 5,
      title: "Erros comuns em portfólios de design e como evitar",
      image: "/imagens_blog/erroscomuns_unife.png",
      link: "https://www.unifecaf.com.br/post/10-erros-no-portfolio-que-podem-te-prejudicar?utm_source=chatgpt.com"
    },
    {
      id: 6,
      title: "Design responsivo: como garantir que seu portfólio funcione em qualquer tela",
      image: "/imagens_blog/webshare.png",
      link: "https://www.webshare.com.br/blog/design-responsivo/?utm_source=chatgpt.com"
    },
    {
      id: 7,
      title: "Quem é seu público-alvo (recrutadores, clientes, agências)?",
      image: "/imagens_blog/semrush.png",
      link: "https://pt.semrush.com/blog/publico-alvo/"
    },
    {
      id: 8,
      title: "O que é portfólio, quais os tipos e como criar um site de portfólio?",
      image: "/imagens_blog/link_nacional.png",
      link: "https://www.linknacional.com.br/blog/o-que-e-portfolio/?srsltid=AfmBOooq18EeMmyJKbBiOfmT5_XKV6Gr0gqGoBCmXQHHfaGGM1t1h30k"
    },
    {
      id: 9,
      title: "Portfólio profissional: o que é, tipos e como montar o seu para destacar sua experiência no mercado",
      image: "/imagens_blog/ponto_tel_ultima.png",
      link: "https://www.pontotel.com.br/portfolio-profissional/"
    }
  ];

  return (
    <div>
      {/* Header */}
      <header>
        <div className={styles.header}>
          <div className={styles.logo}>
            <img src={logoImg} alt="Logo Infinity School" />
          </div>

          <nav className={`${styles['nav-menu']} ${isMenuOpen ? styles.active : ''}`}>
            <div className={styles['mobile-logo']}>
              <img src={logoImg} alt="Logo Infinity School" />
            </div>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); setIsMenuOpen(false); }}>Home</a>
            <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); setIsMenuOpen(false); }}>Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); setIsMenuOpen(false); }}>Blog</a>
            
            {/* Botões aparecem apenas no menu mobile */}
            <div className={styles['header-buttons']}>
              <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); setIsMenuOpen(false); }}>
                Login
              </a>
              <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); setIsMenuOpen(false); }}>
                Cadastre-se
              </a>
              <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário" onClick={(e) => { e.preventDefault(); onNavigate('profile'); setIsMenuOpen(false); }}>
                <i className="fa-solid fa-user"></i>
              </a>
            </div>
          </nav>

          <div className={styles['header-buttons']}>
            <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
              Login
            </a>
            <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>
              Cadastre-se
            </a>
            <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário" onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}>
              <i className="fa-solid fa-user"></i>
            </a>
          </div>

          <button 
            className={`${styles['nav-toggle']} ${isMenuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation"
          >
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
            <span className={styles.hamburger}></span>
          </button>
        </div>
      </header>

      <main>
        <section className={styles.carrossel}>
          <h1 className={styles.titulo}>Explore Dicas e Tutoriais</h1>
          <p className={styles.paragrafo}>
            Tudo o que você precisa saber para criar um portfólio que se destaca.
          </p>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }} className={styles['btn-comecar']}>
            Começar
          </a>
        </section>

        <section id="articles" className={styles['blog-articles']}>
          <div className={styles['articles-grid']}>
            {blogArticles.map((article) => (
              <article key={article.id} className={styles['article-card']}>
                <a href={article.link} target="_blank" rel="noopener noreferrer">
                  <div className={styles['article-image']}>
                    <img src={article.image} alt={article.title} />
                  </div>
                  <h3>{article.title}</h3>
                </a>
              </article>
            ))}
          </div>
        </section>
      </main>

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
              <a href="#" onClick={(e) => { e.preventDefault(); openPrivacyModal(); }}>Privacidade</a>
            </div>
            
            <div className={styles['social-media']}>
              <span>Rede social</span>
              <div className={styles['social-icons']}>
                <a href="https://www.instagram.com/infinity.school/" className={styles['social-icon']}>
                  <img src="/icons/instagram.png" alt="Instagram" onError={(e) => console.log('Erro ao carregar Instagram:', e)} />
                </a>
                <a href="https://wa.me/11999999999" className={styles['social-icon']}>
                  <img src="/icons/whatsapp.png" alt="WhatsApp" onError={(e) => console.log('Erro ao carregar WhatsApp:', e)} />
                </a>
                <a href="https://www.linkedin.com/company/infinityschool/posts/?feedView=all" className={styles['social-icon']}>
                  <img src="/icons/linkedin.png" alt="LinkedIn" onError={(e) => console.log('Erro ao carregar LinkedIn:', e)} />
                </a>
              </div>
            </div>
          </div>
          
          <div className={styles['footer-bottom']}>
            <p>&copy; 2025 Infinity School. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {isPrivacyModalOpen && (
        <div className={styles.modal} onClick={closePrivacyModal}>
          <div className={styles['modal-content']} onClick={(e) => e.stopPropagation()}>
            <span className={styles.close} onClick={closePrivacyModal}>&times;</span>
            <h2>Política de Privacidade</h2>
            <p>Todas as suas informações pessoais recolhidas serão usadas para ajudar a tornar a sua visita no nosso site mais produtiva e o mais agradável possível. E a garantia da confidencialidade dos dados pessoais dos utilizadores do nosso site é muito importante para a Infinity School. Todas as informações pessoais relativas a membros, clientes ou visitantes que usem o site da Infinity School serão tratadas em concordância com a Lei da Proteção de Dados Pessoais de 26 de outubro de 1998 (Lei n.º 67/98). As informações pessoais recolhidas podem incluir o seu nome, e-mail, número de telefone fixo e/ou celular, entre outros. O uso do site da Infinity School pressupõe a aceitação deste Acordo de Privacidade. A equipe da Infinity School reserva-se o direito de alterar este acordo sem aviso prévio. Deste modo, recomendamos que consulte a nossa política de privacidade com regularidade de forma a estar sempre atualizado.</p> <br />

            <h2>Os anúncios</h2>
            <p>Tal como outros websites, coletamos e utilizamos informação contida nos anúncios. A informação contida nos anúncios inclui o seu endereço IP (Internet Protocol), o seu ISP (Internet Service Provider, como o Sapo, Clix ou outro), o browser que utilizou ao visitar o nosso website (como o Internet Explorer ou o Firefox), o tempo da sua visita e que páginas visitou dentro do nosso website.</p> <br />

            <h2>Política de cookies Infinity School</h2>
            <h2>O que são cookies?</h2>
            <p>Como é prática comum em quase todos os sites profissionais, este site usa cookies, que são pequenos arquivos baixados no seu computador, para melhorar sua experiência. Esta página descreve quais informações eles coletam, como as usamos e por que às vezes precisamos armazenar esses cookies. Também compartilharemos como você pode impedir que esses cookies sejam armazenados, no entanto, isso pode fazer o downgrade ou 'quebrar' certos elementos da funcionalidade do site.</p> <br />
            
            <h2>Como usamos os cookies?</h2>
            <p>Utilizamos cookies por vários motivos, detalhados abaixo. Infelizmente, na maioria dos casos, não existem opções padrão do setor para desativar os cookies sem desativar completamente a funcionalidade e os recursos que eles adicionam a este site. É recomendável que você deixe todos os cookies se não tiver certeza se precisa ou não deles, caso sejam usados para fornecer um serviço que você usa.</p> <br />

            <h2>Como desativar cookies:</h2>
            <p>Você pode impedir a configuração de cookies ajustando as configurações do seu navegador (consulte a Ajuda do navegador para saber como fazer isso). Esteja ciente de que a desativação de cookies afetará a funcionalidade deste e de muitos outros sites que você visita. A desativação de cookies geralmente resultará na desativação de determinadas funcionalidades e recursos deste site. Portanto, é recomendável que você não desative os cookies.</p> <br />

            <h2>Cookies que definimos:</h2>
            <p>Cookies relacionados a e-mail marketing: Este site oferece serviços de assinatura de e-mail marketing e os cookies podem ser usados para lembrar se você já está registrado e se deve mostrar determinadas notificações válidas apenas para usuários inscritos / não inscritos;
            Cookies relacionados a pesquisas: Periodicamente, oferecemos pesquisas e questionários para fornecer informações interessantes, ferramentas úteis ou para entender nossa base de usuários com mais precisão. Essas pesquisas podem usar cookies para lembrar quem já participou numa pesquisa ou para fornecer resultados precisos após a alteração das páginas;
            Cookies relacionados a formulários: Quando você envia dados por meio de um formulário como os encontrados nas páginas de contacto ou nos formulários de comentários, os cookies podem ser configurados para lembrar os detalhes do usuário para correspondência futura;
            Cookies de preferências do site: Para proporcionar uma ótima experiência neste site, fornecemos a funcionalidade para definir suas preferências de como esse site é executado quando você o usa. Para lembrar suas preferências, precisamos definir cookies para que essas informações possam ser chamadas sempre que você interagir com uma página for afetada por suas preferências.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;