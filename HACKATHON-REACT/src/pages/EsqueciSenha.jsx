import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './EsqueciSenha.module.css';
import logoImg from '../images/logo-padrao.png';

export default function EsqueciSenha({ onNavigate }) {
  const [cpf, setCpf] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { recoverPassword } = useAuth();

  const formatCpf = (value) => {
    const clean = value.replace(/\D/g, '');
    return clean
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleInputChange = (e) => {
    setCpf(formatCpf(e.target.value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const cpfLimpo = cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setError('CPF deve ter 11 dígitos.');
      setLoading(false);
      return;
    }

    try {
      const result = await recoverPassword(cpfLimpo);
      if (result.success) {
        onNavigate('emailEnviado');
      } else {
        setError(result.error || 'Erro ao enviar email de recuperação.');
      }
    } catch {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.esquecissenhaPage}>
      <header className={styles.header}>
        <div className={styles['logo-in']}>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
            <img src={logoImg} alt="logo-infinity" className={styles['logo-in']} />
          </a>
        </div>
      </header>

      <div className={styles.container}>
        <div className={styles.imagem}></div>

        <div className={styles.formulario}>
          <form onSubmit={handleSubmit}>
            <h1>Redefinir Senha</h1>
            <h3 className={styles.frase}>Entre com seu CPF para redefinir:</h3>

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

            <label htmlFor="cpf">CPF</label>
            <input
              id="cpf"
              name="cpf"
              type="tel"
              maxLength="14"
              placeholder="000.000.000-00"
              value={cpf}
              onChange={handleInputChange}
              required
            />

            <button type="submit" className={styles['enviar-btn']} disabled={loading}>
              {loading ? 'Enviando...' : 'Enviar'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
