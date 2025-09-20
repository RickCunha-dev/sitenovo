import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './UserArea.module.css';

// Importações das imagens
import logoImg from '../images/Logo padrão.png';
import instagramIcon from '../icons/instagram.png';
import whatsappIcon from '../icons/whatsapp.png';
import linkedinIcon from '../icons/linkedin.png';

const UserArea = ({ onNavigate }) => {
  const { user, logout } = useAuth();

  const getFirstName = (fullName) => {
    if (!fullName) return '';
    return fullName.split(' ')[0];
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <header className={styles.header}>
        <div className={styles['header-content']}>
          <div className={styles.logo}>
            <img src={logoImg} alt="Logo Infinity" />
          </div>
          
          <nav className={styles.nav}>
            <a href="#home" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Home</a>
            <a href="#explorar" onClick={(e) => { e.preventDefault(); onNavigate('explore'); }}>Explorar</a>
            <a href="#blog" onClick={(e) => { e.preventDefault(); onNavigate('blog'); }}>Blog</a>
          </nav>

          <div className={styles['header-buttons']}>
            <span className={styles['user-greeting']}>
              Olá, {getFirstName(user?.nome_completo)}!
            </span>
            <a href="#logout" className={`${styles.btn} ${styles['btn-logout']}`} 
               onClick={(e) => { e.preventDefault(); logout(); onNavigate('home'); }}>
              Sair
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.main}>
        <div className={styles['user-content']}>
          <div className={styles['welcome-section']}>
            <h1>Bem-vindo à sua área, {getFirstName(user?.nome_completo)}!</h1>
            <p>Aqui você pode gerenciar seu perfil e acompanhar suas atividades.</p>
          </div>

          <div className={styles['user-info-section']}>
            <h2>Suas Informações</h2>
            <div className={styles['info-grid']}>
              <div className={styles['info-card']}>
                <label>Nome Completo:</label>
                <span>{user?.nome_completo}</span>
              </div>
              <div className={styles['info-card']}>
                <label>Email:</label>
                <span>{user?.email}</span>
              </div>
              <div className={styles['info-card']}>
                <label>CPF:</label>
                <span>{user?.cpf}</span>
              </div>
            </div>
          </div>

          <div className={styles['actions-section']}>
            <h2>Ações Disponíveis</h2>
            <div className={styles['actions-grid']}>
              <button 
                className={styles['action-btn']}
                onClick={() => onNavigate('profile')}
              >
                <i className="fa-solid fa-user"></i>
                Editar Perfil
              </button>
              <button 
                className={styles['action-btn']}
                onClick={() => onNavigate('explore')}
              >
                <i className="fa-solid fa-search"></i>
                Explorar Serviços
              </button>
              <button 
                className={styles['action-btn']}
                onClick={() => onNavigate('portfolio')}
              >
                <i className="fa-solid fa-briefcase"></i>
                Ver Portfolio
              </button>
              <button 
                className={styles['action-btn']}
                onClick={() => onNavigate('blog')}
              >
                <i className="fa-solid fa-blog"></i>
                Ler Blog
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles['footer-content']}>
          <div className={styles['footer-logo']}>
            <img src={logoImg} alt="Logo Infinity" />
          </div>
          
          <div className={styles['social-icons']}>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={instagramIcon} alt="Instagram" />
            </a>
            <a href="https://whatsapp.com" target="_blank" rel="noopener noreferrer">
              <img src={whatsappIcon} alt="WhatsApp" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={linkedinIcon} alt="LinkedIn" />
            </a>
          </div>
        </div>
        
        <div className={styles['footer-bottom']}>
          <p>&copy; 2025 Infinity. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default UserArea;