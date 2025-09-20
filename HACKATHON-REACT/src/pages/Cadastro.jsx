import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import styles from './Cadastro.module.css';

export default function Cadastro({ onNavigate }) {
  const [formData, setFormData] = useState({
    nome_completo: '',
    cpf: '',
    email: '',
    password: '',
    confirmPassword: '',
    data_nascimento: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const { register } = useAuth();

  const formatCpf = (value) => {
    const cleanValue = value.replace(/\D/g, '');
    return cleanValue
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cpf') {
      const formattedValue = formatCpf(value);
      setFormData(prev => ({ ...prev, [name]: formattedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'password') {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem');
      return false;
    }

    if (formData.password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres');
      return false;
    }

    const cpfLimpo = formData.cpf.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      setError('CPF deve ter 11 dígitos');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    if (!validateForm()) {
      setLoading(false);
      return;
    }

    try {
      const cpfLimpo = formData.cpf.replace(/\D/g, '');
      
      const userData = {
        nome_completo: formData.nome_completo,
        cpf: cpfLimpo,
        email: formData.email,
        password: formData.password,
        data_nascimento: formData.data_nascimento
      };

      const result = await register(userData);

      if (result.success) {
        setSuccess('Cadastro realizado com sucesso!');
        setTimeout(() => {
          onNavigate('login');
        }, 2000);
      } else {
        setError(result.error || 'Erro ao cadastrar usuário');
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.cadastroPage}>
      <header className={styles.logo}>
        <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>
          <img src="/images/Logo padrão.png" alt="Logo" />
        </a>
      </header>

      <div className={styles.container}>
        <div className={styles.image}></div>

        <div className={styles.formulario}>
          <h1>Cadastre-se</h1>
          
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
          
          {success && (
            <div style={{
              color: 'green', 
              marginBottom: '10px', 
              textAlign: 'center',
              padding: '10px',
              backgroundColor: '#e6ffe6',
              borderRadius: '5px',
              border: '1px solid #99ff99'
            }}>
              {success}
            </div>
          )}
          
          <form onSubmit={handleSubmit}>
            <label htmlFor="nome_completo">Nome Completo</label><br />
            <input
              id="nome_completo"
              name="nome_completo"
              type="text"
              value={formData.nome_completo}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="cpf">CPF</label><br />
            <input
              id="cpf"
              name="cpf"
              type="text"
              maxLength="14"
              placeholder="000.000.000-00"
              value={formData.cpf}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="email">Email</label><br />
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            /><br /><br />
            
            <label htmlFor="data_nascimento">Data de Nascimento</label><br />
            <input
              id="data_nascimento"
              name="data_nascimento"
              type="date"
              value={formData.data_nascimento}
              onChange={handleInputChange}
              required
            /><br /><br />

            <label htmlFor="password">Senha</label><br />
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
                src={showPassword ? '/icons/olhoaberto.png' : '/icons/olhofechado.png'}
                alt="Mostrar senha"
                className={styles.olhinho}
                onClick={() => togglePasswordVisibility('password')}
              />
            </div><br /><br />

            <label htmlFor="confirmPassword">Confirmar Senha</label><br />
            <div className={styles['input-olho']}>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              <img
                src={showConfirmPassword ? '/icons/olhoaberto.png' : '/icons/olhofechado.png'}
                alt="Mostrar confirmar senha"
                className={styles.olhinho}
                onClick={() => togglePasswordVisibility('confirmPassword')}
              />
            </div><br /><br />

            <div className={styles.btnForm}>
              <button 
                type="submit" 
                className={styles['btn-cadastro']}
                disabled={loading}
              >
                {loading ? 'Cadastrando...' : 'Cadastrar'}
              </button>
            </div>
          </form>

          <div className={styles.loginLink}>
            <p>Já tem uma conta? 
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>
                {' '}Faça login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}