import api from './api';

// Serviços de autenticação
export const authService = {
  // Registro de usuário
  register: async (userData) => {
    try {
      const response = await api.post('/register', userData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Erro ao cadastrar usuário',
      };
    }
  },

  // Login de usuário
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      const { access_token, token_type } = response.data;
      
      // Salvar token no localStorage
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('token_type', token_type);
      
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Erro ao fazer login',
      };
    }
  },

  // Logout
  logout: () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('token_type');
    localStorage.removeItem('user_data');
    window.location.href = '/login';
  },

  // Verificar se está autenticado
  isAuthenticated: () => {
    return !!localStorage.getItem('access_token');
  },

  // Recuperar senha
  recoverPassword: async (cpf) => {
    try {
      const response = await api.get(`/recuperarsenha/${cpf}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.detail || 'Erro ao recuperar senha',
      };
    }
  },
};