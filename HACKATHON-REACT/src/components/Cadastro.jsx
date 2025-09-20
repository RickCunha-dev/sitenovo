import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import '../Pag_Cadastro/cadastro.css'; // Importando o CSS existente

const Cadastro = () => {
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
      // Remover máscara do CPF para enviar ao backend
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
        setSuccess('Cadastro realizado com sucesso! Redirecionando para login...');
        setTimeout(() => {
          window.location.href = '/login';
        }, 2000);
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
    <div className="cadastro-container">
      <div className="cadastro-box">
        <h2>Cadastrar</h2>
        
        {error && (
          <div className="error-message" style={{
            color: 'red', 
            marginBottom: '10px', 
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}

        {success && (
          <div className="success-message" style={{
            color: 'green', 
            marginBottom: '10px', 
            textAlign: 'center'
          }}>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="nome_completo">Nome Completo:</label>
            <input
              type="text"
              id="nome_completo"
              name="nome_completo"
              value={formData.nome_completo}
              onChange={handleInputChange}
              placeholder="Digite seu nome completo"
              required
            />
          </div>

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
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Digite seu email"
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="data_nascimento">Data de Nascimento:</label>
            <input
              type="date"
              id="data_nascimento"
              name="data_nascimento"
              value={formData.data_nascimento}
              onChange={handleInputChange}
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

          <div className="input-group">
            <label htmlFor="confirmPassword">Confirmar Senha:</label>
            <div className="input-olho">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirme sua senha"
                required
              />
              <img
                className="olhinho"
                src={showConfirmPassword ? '../Icones/olhoaberto.png' : '../Icones/olhofechado.png'}
                alt="Toggle password visibility"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="cadastro-btn"
            disabled={loading}
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>

        <div className="cadastro-links">
          <a href="/login">Já tem conta? Faça login</a>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;
