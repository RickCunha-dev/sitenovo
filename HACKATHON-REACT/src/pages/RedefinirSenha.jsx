import React, { useState } from 'react';
import styles from './RedefinirSenha.module.css';

export default function RedefinirSenha({ onNavigate }) {
  const [formData, setFormData] = useState({
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState({
    senha: false,
    confirmarSenha: false
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.senha && formData.confirmarSenha) {
      if (formData.senha === formData.confirmarSenha) {
        alert('Senha redefinida com sucesso!');
        onNavigate('login');
      } else {
        alert('As senhas não coincidem!');
      }
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header>
        <div className={styles['logo-in']}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src="/images/Logo padrão.png" alt="logo-infinity" className={styles['logo-in']} />
          </a>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.imagem}>
          <img src="/images/redefinir senha.png" alt="Ilustração de um cadeado e chave para redefinir a senha" />
        </div>

        <div className={styles.formulario}>
          <form onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>
            
            <label htmlFor="senha">Senha</label><br />
            <div className={styles['input-olho']}>
              <input 
                id="senha" 
                name="senha" 
                type={showPassword.senha ? 'text' : 'password'}
                value={formData.senha}
                onChange={handleInputChange}
                required
              />
              <img 
                src={showPassword.senha ? "/icons/olhoaberto.png" : "/icons/olhofechado.png"}
                alt="Mostrar senha" 
                className={styles.olhinho}
                onClick={() => togglePasswordVisibility('senha')}
              />
            </div><br /><br />

            <label htmlFor="confirmarSenha">Confirmar Senha</label><br />
            <div className={styles['input-olho']}>
              <input 
                id="confirmarSenha" 
                name="confirmarSenha" 
                type={showPassword.confirmarSenha ? 'text' : 'password'}
                value={formData.confirmarSenha}
                onChange={handleInputChange}
                required
              />
              <img 
                src={showPassword.confirmarSenha ? "/icons/olhoaberto.png" : "/icons/olhofechado.png"}
                alt="Mostrar senha" 
                className={styles.olhinho}
                onClick={() => togglePasswordVisibility('confirmarSenha')}
              />
            </div>

            <button type="submit" className={styles['enviar-btn']}>Enviar</button>
          </form>
        </div>
      </div>
    </div>
  );
}