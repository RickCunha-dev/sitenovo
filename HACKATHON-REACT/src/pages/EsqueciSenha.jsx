import { useState } from 'react';
import styles from './EsqueciSenha.module.css';

export default function EsqueciSenha({ onNavigate }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email para redefinição:', email);
    // Redireciona para a página de confirmação de email enviado
    onNavigate('emailEnviado');
  };

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className={styles.esquecissenhaPage}>
      <header className={styles.header}>
        <div className={styles['logo-in']}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src="/images/Logo padrão.png" alt="logo-infinity" className={styles['logo-in']} />
          </a>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.imagem}></div>

        <div className={styles.formulario}>
          <form onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>
            <h3 className={styles.frase}>Entre com seu email para redefinir:</h3>

            <label htmlFor="email">Endereço de email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Digite seu email"
              value={email}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className={styles['enviar-btn']}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}