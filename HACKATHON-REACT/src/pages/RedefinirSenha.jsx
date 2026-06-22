import React, { useState } from 'react';
import styles from './RedefinirSenha.module.css';
import logoImg from '../images/logo-padrao.png';
import redefinirImg from '../images/redefinir-senha.png';
import olhoAbertoIcon from '../icons/olhoaberto.png';
import olhoFechadoIcon from '../icons/olhofechado.png';
import { authService } from '../services/authService';

export default function RedefinirSenha({ onNavigate }) {
  const [formData, setFormData] = useState({
    cpf: '',
    senha: '',
    confirmarSenha: ''
  });
  const [showPassword, setShowPassword] = useState({
    senha: false,
    confirmarSenha: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formatCpf = (value) => {
    const clean = value.replace(/\D/g, '');
    return clean
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cpf') {
      setFormData(prev => ({ ...prev, cpf: formatCpf(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cpfLimpo = formData.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setError('CPF deve ter 11 dígitos.');
      return;
    }
    if (formData.senha.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (formData.senha !== formData.confirmarSenha) {
      setError('As senhas não coincidem.');
      return;
    }

    setLoading(true);
    try {
      const result = await authService.resetPassword(cpfLimpo, formData.senha);
      if (result.success) {
        onNavigate('login');
      } else {
        setError(result.error || 'Erro ao redefinir senha.');
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <header className={styles.pageHeader}>
        <div className={styles['logo-in']}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src={logoImg} alt="logo-infinity" className={styles['logo-in']} />
          </a>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.imagem}>
          <img src={redefinirImg} alt="Ilustração de um cadeado e chave para redefinir a senha" />
        </div>

        <div className={styles.formulario}>
          <form onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>

            {error && (
              <div style={{
                color: 'red',
                marginBottom: '10px',
                padding: '10px',
                backgroundColor: '#ffe6e6',
                borderRadius: '5px',
                border: '1px solid #ff9999'
              }}>
                {error}
              </div>
            )}

            <label htmlFor="cpf">CPF</label><br />
            <input
              id="cpf"
              name="cpf"
              type="tel"
              maxLength="14"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="senha">Nova Senha</label><br />
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
                src={showPassword.senha ? olhoAbertoIcon : olhoFechadoIcon}
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
                src={showPassword.confirmarSenha ? olhoAbertoIcon : olhoFechadoIcon}
                alt="Mostrar senha"
                className={styles.olhinho}
                onClick={() => togglePasswordVisibility('confirmarSenha')}
              />
            </div>

            <button type="submit" className={styles['enviar-btn']} disabled={loading}>
              {loading ? 'Salvando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
