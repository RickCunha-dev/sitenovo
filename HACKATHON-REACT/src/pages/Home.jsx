import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Home.module.css';

// Importações das imagens
import logoImg from '../images/Logo padrão.png';
import telaGif from '../images/telainicialeve.gif';
import mulherRobo from '../images/mulher_robo.png';
import instagramIcon from '../icons/instagram.png';
import whatsappIcon from '../icons/whatsapp.png';
import linkedinIcon from '../icons/linkedin.png';

// Importações das fotos dos feedbacks
import brunaImg from '../images/Brunaa.jpeg';
import paulaImg from '../images/PaulaCCoelho.jpeg';
import kellyImg from '../images/Kelly.jpeg';
import dayanaImg from '../images/Dayana.jpeg';
import ricardoImg from '../images/ricardo.jpeg';
import mariaImg from '../images/MariaCamila.jpeg';
import nayaraImg from '../images/Nayara.jpeg';
import lucasImg from '../images/Lucas.jpeg';
import claudiaImg from '../images/Claudia.jpeg';
import pabloImg from '../images/Pablo.jpeg';
import jonathanImg from '../images/Jonathan.jpeg';
import victorImg from '../images/Victor.jpeg';
import marcosImg from '../images/Marcos.jpeg';
import joaoImg from '../images/Joao.jpeg';

const feedbacks = [
  // Slide 1 - 3 cards
  [
    {
      img: brunaImg,
      nome: 'Bruna Santos - Designer',
      texto: 'A experiência que estou tendo na infinity está sendo incrível, superou minha espectativas. Mostrar como é na realidade o mercado de trabalho e ter projetos reais faz total diferença para o crescimento profissional',
    },
    {
      img: paulaImg,
      nome: 'Paula Carregal - Full Stack Developer',
      texto: 'Cada dia na Infinity me proporciona novas descobertas e aprendizados, gosto muito da metodologia.',
    },
    {
      img: kellyImg,
      nome: 'Kelly Robson - Full Stack Developer',
      texto: 'Estou gostando muito da Infinity porque além de ser 100% presencial, o conteúdo é claro e bem estruturado, está sendo uma experiência ótima para mim.',
    }
  ],
  // Slide 2 - 3 cards
  [
    {
      img: dayanaImg,
      nome: 'Dayana Sena - Full Stack Developer',
      texto: 'Gostei muito da Infinity School, é um ambiente diferenciado e inspirador, que dá até vontade de morar lá. O ensino é completo, dinâmico e envolve os alunos. Com certeza, uma experiência transformadora.',
    },
    {
      img: ricardoImg,
      nome: 'Ricardo Wemerson - Full Stack Developer',
      texto: 'A infinity School possui uma estrutura e profissionais incríveis! Estudar na mesma se tornou um hobbie, pois é prazeroso estudar em um ambiente com pessoas tão atenciosas, além de ter vários eventos interessantes.',
    },
    {
      img: mariaImg,
      nome: 'Maria Camila Rosa - Full Stack Developer',
      texto: 'A Infinity School tem sido um divisor de águas na minha trajetória. Cada aula é mais do que aprendizado técnico: é um impulso para ir além, explorar novos caminhos e conquistar habilidades que antes pareciam bem distantes. Na área de automação, estou evoluindo de forma consistente, superando desafios que antes me pareciam obstáculos intransponíveis. A Infinity não está apenas me ensinando programação; está me ajudando a transformar minha visão de futuro, fortalecendo minha autoconfiança e me preparando para ser protagonista na minha carreira.',
    }
  ],
  // Slide 3 - 3 cards
  [
    {
      img: nayaraImg,
      nome: 'Nayara Ventura - Full Stack Developer',
      texto: 'Minha jornada na Infinity School tem sido extremamente enriquecedora. O curso de Full Stack combina teoria e prática de forma eficiente, além de contar com professores sempre disponíveis para apoiar nosso aprendizado. Tenho percebido uma evolução consistente tanto no front-end quanto no back-end, o que me dá mais segurança para atuar no mercado de tecnologia.',
    },
    {
      img: lucasImg,
      nome: 'Lucas Felipe- Full Stack Developer',
      texto: 'O curso de programação Full Stack tem sido muito enriquecedor, pois une teoria e prática de maneira equilibrada. As aulas estão me ajudando a desenvolver habilidades técnicas importantes e a compreender melhor como funciona o mercado de tecnologia. Além disso, a metodologia adotada facilita o aprendizado e torna o conteúdo mais dinâmico e aplicável ao dia a dia.',
    },
    {
      img: claudiaImg,
      nome: 'Claudia Alvarenga - Marketing',
      texto: 'Minha experiência na Infinity está sendo bem positiva. Como dentista senti a necessidade de conhecer mais a respeito do marketing digital e não poderia ter escolhido uma escola melhor. Profissionais atenciosos e qualificados e colegas dedicados que querem aprender e se qualificar cada vez mais. Vou levar esses momentos pra vida.',
    }
  ],
  // Slide 4 - 3 cards
  [
    {
      img: pabloImg,
      nome: 'Pablo Martin - Full Stack Developer',
      texto: 'Com tempo que passei na Infinity School desenvolvi habilidades e conexões que aprimoraram meu conhecimento,Ambiente amigavel eacolhedor com profissionais Qualificados auxiliando sempre que necessário.',
    },
    {
      img: jonathanImg,
      nome: 'Jonathan Torres - Designer',
      texto: 'Minha experiência na infinity está fazendo toda a diferença na prática do meu dia a dia como design. Pois está me colocando dentro da realidade da minha área e me preparando para o mercado de trabalho com a oportunidade de apresentar meu projeto para empresas específicas.',
    },
    {
      img: victorImg,
      nome: 'Victor Anastacio - Full Stack Developer',
      texto: 'Durante o curso de Fullstack na Infinity School, desenvolvi minha lógica de programação, participei de projetos que se destacaram e tive a satisfação de alcançar o top 10 da turma. A equipe da escola sempre me apoiou, trazendo desafios constantes e tornando o aprendizado divertido. Esse processo também foi importante para fortalecer minha presença profissional: organizei meus projetos no GitHub e aumentei minha visibilidade no LinkedIn, ampliando meu networking e abrindo novas oportunidades. Foi uma experiência transformadora que consolidou minha base na programação e no mercado de tecnologia.',
    }
  ],
  // Slide 5 - Agradecimento especial
  [
    {
      nome: 'Agradecimento Especial',
      texto: 'Aos nossos incríveis monitores e professores, nosso sincero agradecimento. Tudo isso não seria possível sem a ajuda e a participação de vocês. O projeto LimitlessHax se tornou realidade graças à sua orientação, paciência e sabedoria. Cada conselho foi fundamental e cada incentivo nos deu força para continuar. Vocês foram a base para que pudéssemos construir algo sem limites. Essa vitória é nossa! Muito obrigado! Equipe LimitlessHax',
      special: true
    }
  ],
  // Slide 6 - 2 cards finais  
  [
    {
      img: marcosImg,
      nome: 'Marcos Simões - Full Stack Developer',
      texto: 'Minha experiência na Infinity como aluno foi extremamente positiva e importante como Dev Full-Stack, onde os monitores sempre me auxiliaram, os professores de diversas áreas sempre me trataram muito bem e me ensinaram muita coisa. Tive o prazer de sentar na cadeira onde muitos alunos hoje sentam. Fiquei muito feliz de ter sido parte da Infinity.',
    },
    {
      img: joaoImg,
      nome: 'João - Full Stack Developer',
      texto: 'Eu fiz o curso de Programação Full Stack e posso afirmar que minha experiência na Infinity foi excepcional.',
    }
  ]
];

export default function Home({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const headerButtonsRef = useRef(null);
  
  // Hook de autenticação
  const { isAuthenticated, user, logout } = useAuth();
  
  // Função para obter primeiro nome
  const getFirstName = (fullName) => {
    return fullName ? fullName.split(' ')[0] : 'Usuário';
  };

  // Toggle do menu mobile
  const toggleMenu = () => {
    const newMenuState = !menuOpen;
    setMenuOpen(newMenuState);
    
    // Controlar scroll do body
    if (newMenuState) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }
  };

  // Funções do modal
  const openModal = (e) => {
    e.preventDefault();
    console.log('Abrindo modal de privacidade'); // Debug
    setModalOpen(true);
    document.body.style.overflow = 'hidden'; // Prevenir scroll
  };

  const closeModal = () => {
    console.log('Fechando modal de privacidade'); // Debug
    setModalOpen(false);
    document.body.style.overflow = 'auto'; // Restaurar scroll
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

  // Cleanup do scroll quando componente desmonta
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Animações de scroll reveal
  useEffect(() => {
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

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  return (
    <div className={styles.homePage}>
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
            <a href="#home">Home</a>
            <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
            
            {/* Botões aparecem apenas no menu mobile */}
            <div className={styles['header-buttons']}>
              {!isAuthenticated ? (
                <>
                  <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
                  <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
                </>
              ) : (
                <>
                  <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário"
                     onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}>
                    <i className="fa-solid fa-user"></i> Perfil
                  </a>
                  <a href="#logout" className={`${styles.btn} ${styles['btn-logout']}`} 
                     onClick={(e) => { e.preventDefault(); logout(); }}>
                    Sair
                  </a>
                </>
              )}
            </div>
          </nav>

          <div className={styles['header-buttons']}>
            {!isAuthenticated ? (
              <>
                <a href="#login" className={`${styles.btn} ${styles['btn-login']}`} onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
                <a href="#cadastro" className={`${styles.btn} ${styles['btn-cadastro']}`} onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>Cadastre-se</a>
              </>
            ) : (
              <>
                <span className={styles['user-greeting']}>
                  Olá, {getFirstName(user?.nome_completo)}!
                </span>
                <a href="#profile" className={styles['user-btn']} aria-label="Área do usuário"
                   onClick={(e) => { e.preventDefault(); onNavigate('profile'); }}>
                  <i className="fa-solid fa-user"></i>
                </a>
                <a href="#logout" className={`${styles.btn} ${styles['btn-logout']}`} 
                   onClick={(e) => { e.preventDefault(); logout(); }}>
                  Sair
                </a>
              </>
            )}
          </div>

          <button 
            className={`${styles['nav-toggle']} ${menuOpen ? styles.active : ''}`}
            onClick={toggleMenu}
            aria-label="Abrir menu"
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
        <section className={styles.hero}>
          <div className={`${styles.container} ${styles['hero-content']}`}>
            <h1>Jornada Criativa</h1>
            <p>Publique seus melhores projetos e seja visto pelas melhores empresas.</p>
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>
              <button className={`${styles.btn} ${styles['btn-secondary']}`}>Começar</button>
            </a>
          </div>
        </section>

        {/* Video Section */}
        <section className={`${styles['video-section']} video-section`}>
          <div className={styles['video-container']}>
            <img src={telaGif} alt="Vídeo demonstrativo" className={styles['video-placeholder']} />
          </div>
        </section>

        {/* Tendencias Section */}
        <section className={`${styles.tendencias} tendencias`}>
          <div className={styles['tendencias-container']}>
            <div className={styles['tendencias-text']}>
              <h2>Tendências que inspiram<br />Insights que transformam</h2>
              <p>Conectamos as novidades mais quentes do mercado com o passo a passo que vai elevar o nível do seu portfólio.</p>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>
                <button className={`${styles.btn} ${styles['btn-secondary']}`}>Explore</button>
              </a>
            </div>
            <div className={styles['tendencias-image']}>
              <img src={mulherRobo} alt="Mulher com rosto metade humano, metade robô" />
            </div>
          </div>
        </section>

        {/* Feedbacks Section */}
        <section className={`${styles.feedbacks} feedbacks w-100`} style={{ width: '100vw', margin: '0', padding: '80px 0' }}>
          <div className={styles['feedbacks-container']}>
            <h2 className="text-center mb-5">Feedbacks</h2>
            <div id="feedbackCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
              <div className="carousel-inner">
                {feedbacks.map((slideGroup, slideIndex) => (
                  <div 
                    key={slideIndex}
                    className={`carousel-item ${slideIndex === 0 ? 'active' : ''}`}
                  >
                    <div className="d-flex justify-content-center gap-3 px-3">
                      {slideGroup.map((feedback, cardIndex) => (
                        <div key={cardIndex} className={`${styles['feedback-card']} flex-shrink-0`}>
                          {feedback.special ? (
                            <div className={styles['special-card']}>
                              <h4>{feedback.nome}</h4>
                              <p>"{feedback.texto}"</p>
                            </div>
                          ) : (
                            <>
                              <img src={feedback.img} alt={`Foto de ${feedback.nome}`} className="img-fluid" />
                              <h4>{feedback.nome}</h4>
                              <p>"{feedback.texto}"</p>
                              <div className={styles.stars}>★★★★★</div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Controles Bootstrap */}
              <button 
                className="carousel-control-prev"
                type="button"
                data-bs-target="#feedbackCarousel"
                data-bs-slide="prev"
                aria-label="Slide anterior"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button 
                className="carousel-control-next"
                type="button"
                data-bs-target="#feedbackCarousel"
                data-bs-slide="next"
                aria-label="Próximo slide"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
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
              <a href="#inicio">Início</a>
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
          </div>
        </div>
      )}
    </div>
  );
}