import styles from './EmailEnviado.module.css';

export default function EmailEnviado({ onNavigate }) {
  const handleOkClick = () => {
    // Redireciona para a página de login ou home
    onNavigate('login');
  };

  return (
    <div className={styles.emailEnviadoPage}>
      <header className={styles.header}>
        <div className={styles['logo-in']}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src="/Imagens/Logo padrão.png" alt="logo-infinity" className={styles['logo-in']} />
          </a>
        </div>
      </header>

      <div className={styles.texto}>
        <h1>Email enviado com sucesso!</h1><br />

        <h2 className={styles.acesse}>
          Acesse sua caixa de email para realizar a
          <br /> redefinição de senha.
        </h2>

        <br /><br />
        <button className={styles['ok-btn']} onClick={handleOkClick}>
          OK
        </button>
      </div>
    </div>
  );
}