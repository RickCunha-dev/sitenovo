import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Login.module.css';

export default function Login({ onNavigate }) {
  const [formData, setFormData] = useState({
    cpf: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  // Função para máscara de CPF/CNPJ
  const formatCpfCnpj = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    
    if (cleanValue.length <= 11) { // CPF
      return cleanValue
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else { // CNPJ
      return cleanValue
        .replace(/^(\d{2})(\d)/, "$1.$2")
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2")
        .replace(/(\d{4})(\d)/, "$1-$2");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedValue = formatCpfCnpj(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Remover máscara do CPF para enviar ao backend
      const cpfLimpo = formData.cpf.replace(/\D/g, '');
      
      const result = await login({
        cpf: cpfLimpo,
        password: formData.password
      });

      if (result.success) {
        // Redirecionar para área do usuário
        onNavigate('profile');
      } else {
        setError(result.error || 'Erro ao fazer login');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.loginPage}>
      <header className={styles.logo}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src="/images/logo-padrao.png" alt="logo-infinity" className={styles['logo-in']} />
        </a>
      </header>

      <div className={styles.container}>
        <div className={styles.formulario}>
          <div className={styles['titulo-form']}>
            <h1>Conecte-se</h1>
          </div>
          
          {error && (
            <div style={{
              color: 'red', 
              marginBottom: '10px', 
              textAlign: 'center',
              padding: '10px',
              backgroundColor: '#ffe6e6',
              borderRadius: '5px',
              border: '1px solid #ff9999'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <label htmlFor="cpf" className={styles.label}>Login (CPF/CNPJ)</label><br />
            <input
              id="cpf"
              name="cpf"
              type="tel"
              maxLength="18"
              placeholder=""
              value={formData.cpf}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="password" className={styles.label}>Senha</label><br />
            <div className={styles['input-olho']}>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={handleInputChange}
                required
              />
              <img
                src={showPassword ? "/icons/olhoaberto.png" : "/icons/olhofechado.png"}
                alt="Mostrar senha"
                className={styles.olhinho}
                onClick={togglePasswordVisibility}
              />
            </div><br /><br />

            <div className={styles['option-links']}>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('esqueciSenha'); }}>
                Esqueceu a senha?
              </a>
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('cadastro'); }}>
                Cadastre-se
              </a>
            </div>

            <div className={styles.btnForm}>
              <button 
                type="submit" 
                className={styles['btn-login']}
                disabled={loading}
              >
                {loading ? 'Entrando...' : 'Login'}
              </button>
            </div>
          </form>

          <div className={styles.separador}>
            <span className={styles.ou}>ou</span>
          </div>

          <div className={styles['botoes-redes-socias']}>
            <a href="#" className={styles.google} onClick={(e) => { e.preventDefault(); alert('Login com Google em desenvolvimento'); }}>
              <img src="/icons/search.png" alt="Entrar com Google" />
            </a>
            <a href="#" className={styles.appel} onClick={(e) => { e.preventDefault(); alert('Login com Apple em desenvolvimento'); }}>
              <img src="/icons/apple-logo.png" alt="Entrar com Apple" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
