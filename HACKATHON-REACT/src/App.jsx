import { useState } from 'react'
import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Blog from './pages/Blog';
import Portfolio from './pages/Portfolio';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import EmailEnviado from './pages/EmailEnviado';
import EsqueciSenha from './pages/EsqueciSenha';

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  return (
    <AuthProvider>
      <div style={{ width: '100%', margin: 0, padding: 0 }}>
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'explore' && <Explore onNavigate={setCurrentPage} />}
        {currentPage === 'blog' && <Blog onNavigate={setCurrentPage} />}
        {currentPage === 'portfolio' && <Portfolio onNavigate={setCurrentPage} />}
        {currentPage === 'profile' && <Profile onNavigate={setCurrentPage} />}
        {currentPage === 'login' && <Login onNavigate={setCurrentPage} />}
        {currentPage === 'cadastro' && <Cadastro onNavigate={setCurrentPage} />}
        {currentPage === 'emailEnviado' && <EmailEnviado onNavigate={setCurrentPage} />}
        {currentPage === 'esqueciSenha' && <EsqueciSenha onNavigate={setCurrentPage} />}
      </div>
    </AuthProvider>
  )
}

export default App
