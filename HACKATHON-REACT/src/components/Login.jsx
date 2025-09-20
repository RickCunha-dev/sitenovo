import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../Pag_login/login.css'; // Importando o CSS existente

const Login = () => {
  const [formData, setFormData] = useState({
    cpf: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    // Aplicar máscara CPF se necessário
    if (name === 'cpf') {
      let maskedValue = value.replace(/\D/g, '');
      if (maskedValue.length <= 11) {
        maskedValue = maskedValue.replace(/(\d{3})(\d)/, "$1.$2");
        maskedValue = maskedValue.replace(/(\d{3})(\d)/, "$1.$2");
        maskedValue = maskedValue.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      }
      setFormData(prev => ({ ...prev, [name]: maskedValue }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
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
        // Redirecionar para página principal
        window.location.href = '/home';
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Entrar</h2>
        
        {error && (
          <div className="error-message" style={{
            color: 'red', 
            marginBottom: '10px', 
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="cpf">CPF:</label>
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleInputChange}
              placeholder="000.000.000-00"
              maxLength="14"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Senha:</label>
            <div className="input-olho">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Digite sua senha"
                required
              />
              <img
                className="olhinho"
                src={showPassword ? '../Icones/olhoaberto.png' : '../Icones/olhofechado.png'}
                alt="Toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="login-btn"
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <div className="login-links">
          <a href="/esqueci-senha">Esqueci minha senha</a>
          <a href="/cadastro">Não tem conta? Cadastre-se</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
