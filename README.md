# 🚀 HACKATHON PROJECT - Full Stack Application

## 📊 Status do Projeto: ✅ INTEGRAÇÃO COMPLETA

Uma plataforma web full-stack moderna para portfólios profissionais e networking, desenvolvida durante o hackathon.

---

## 📋 Sobre o Projeto

**Plataforma criativa** que permite aos usuários:
- ✅ Sistema completo de autenticação (Cadastro/Login/Logout)
- ✅ Publicar e visualizar portfólios profissionais
- ✅ Explorar projetos de outros usuários
- ✅ Blog com conteúdo sobre criação de portfólios
- ✅ Recuperação de senha via CPF
- ✅ Interface responsiva para mobile/tablet/desktop
- ✅ API REST com documentação automática

---

## 🏗️ Arquitetura

```
Frontend (React) ← HTTP/REST → Backend (FastAPI) ← SQLAlchemy → Database (SQLite)
    Port 5173                     Port 8001                        hackathon.db
```

---

## 🛠️ Stack Tecnológica

### **Frontend (React)**
- **React 18** - Biblioteca JavaScript para UI
- **Vite** - Build tool e servidor de desenvolvimento  
- **Axios** - Cliente HTTP para API calls
- **Context API** - Gerenciamento de estado
- **CSS Modules** - Estilos componentizados
- **Font Awesome** - Ícones e interface

### **Backend (FastAPI)**
- **FastAPI** - Framework web moderno para Python
- **SQLAlchemy** - ORM para banco de dados
- **Pydantic** - Validação de dados e serialização
- **Bcrypt** - Hash seguro de senhas
- **JWT** - Autenticação via tokens
- **Uvicorn** - Servidor ASGI de alta performance

### **Banco de Dados**
- **SQLite** - Banco de dados local para desenvolvimento
- **SQLAlchemy Core** - Migrations e schema management

---

## 🚀 Começando

### **Pré-requisitos**
- **Node.js** (v16+)
- **Python** (v3.8+)
- **Git**

### **1. Clone o Repositório**
```bash
git clone https://github.com/RickCunha-dev/HACKATHON-REACT.git
cd HACKATHON-REACT
```

### **2. Configurar Backend**
```bash
# Instalar dependências Python
pip install -r requirements.txt

# Navegar para o backend
cd Backend

# Iniciar servidor FastAPI
uvicorn main:app --reload --port 8001
```

### **3. Configurar Frontend**
```bash
# Em outro terminal, navegar para o frontend
cd HACKATHON-REACT

# Instalar dependências Node.js
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

### **4. Acessar a Aplicação**
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:8001
- **Documentação API**: http://localhost:8001/docs

---

## 📁 Estrutura do Projeto

```
HACKATHON PROJECT/
├── 📂 Backend/                     # API FastAPI
│   ├── main.py                     # Aplicação principal
│   ├── models.py                   # Modelos do banco de dados
│   ├── schemas.py                  # Schemas Pydantic
│   ├── security.py                 # Autenticação e JWT
│   ├── db.py                       # Configuração do banco
│   └── hackathon.db               # Banco SQLite (auto-gerado)
│
├── 📂 HACKATHON-REACT/            # Frontend React
│   ├── 📂 src/
│   │   ├── 📂 services/           # APIs e HTTP clients
│   │   ├── 📂 contexts/           # React Context (Auth)
│   │   ├── 📂 components/         # Componentes React
│   │   ├── 📂 pages/              # Páginas da aplicação
│   │   └── App.jsx                # Componente raiz
│   ├── 📂 public/                 # Assets estáticos
│   ├── package.json               # Dependências Node.js
│   └── vite.config.js             # Configuração Vite
│
├── .gitignore                      # Arquivos ignorados pelo Git
├── README.md                       # Este arquivo
├── requirements.txt                # Dependências Python
└── INTEGRACAO_INSTRUCOES.md       # Guia de integração
```

---

## 🔌 API Endpoints

### **Autenticação**
| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/register` | Cadastro de usuário |
| `POST` | `/login` | Login e obtenção de token |
| `GET` | `/recuperarsenha/{cpf}` | Recuperação de senha |

### **Exemplo de Uso**
```bash
# Cadastrar usuário
curl -X POST "http://localhost:8001/register" \\
  -H "Content-Type: application/json" \\
  -d '{
    "nome_completo": "João Silva",
    "cpf": "12345678910",
    "email": "joao@email.com",
    "password": "senha123",
    "data_nascimento": "1990-01-01"
  }'

# Fazer login
curl -X POST "http://localhost:8001/login" \\
  -H "Content-Type: application/json" \\
  -d '{
    "cpf": "12345678910",
    "password": "senha123"
  }'
```

---

## 🧪 Testando a Aplicação

### **1. Teste Manual**
1. Acesse o frontend: http://localhost:5173
2. Cadastre um novo usuário
3. Faça login com as credenciais
4. Explore as funcionalidades

### **2. Teste via API**
- Acesse: http://localhost:8001/docs
- Use a interface Swagger para testar endpoints
- Ou use curl/Postman conforme exemplos acima

---

## 🔧 Configurações

### **Variáveis de Ambiente (Opcionais)**
Crie um arquivo `.env` no Backend se necessário:
```env
SECRET_KEY=sua_chave_secreta_muito_segura_123456789
ACCESS_TOKEN_EXPIRE_MINUTES=30
ALGORITHM=HS256
SQLALCHEMY_DATABASE_URL=sqlite:///./hackathon.db
```

### **Configurações do Frontend**
- URL da API: `src/services/api.js`
- Contexto de Auth: `src/contexts/AuthContext.jsx`

---

## 🎯 Funcionalidades Implementadas

### ✅ **Autenticação Completa**
- [x] Cadastro de usuários com validação
- [x] Login com CPF e senha
- [x] Logout automático
- [x] Tokens JWT com expiração
- [x] Proteção de rotas
- [x] Interceptors automáticos

### ✅ **Interface de Usuário**
- [x] Design responsivo
- [x] Máscaras de entrada (CPF)
- [x] Validação de formulários
- [x] Feedback visual (loading, erros)
- [x] Navegação entre páginas

### ✅ **Backend Robusto**
- [x] API REST documentada
- [x] Validação de dados
- [x] Hash seguro de senhas
- [x] CORS configurado
- [x] Banco de dados SQLite

---

## 🚀 Próximos Passos

- [ ] Implementar upload de imagens
- [ ] Sistema de categorias de portfólio
- [ ] Notificações em tempo real
- [ ] Deploy em produção
- [ ] Testes automatizados
- [ ] Sistema de comentários

---

## 👥 Equipe

- **Desenvolvedor Full-Stack**: RickCunha-dev
- **GitHub**: https://github.com/RickCunha-dev

---

## 📄 Licença

Este projeto foi desenvolvido durante um hackathon para fins educacionais e de demonstração.

---

## 🆘 Suporte

Se encontrar problemas:
1. Verifique se ambos os servidores estão rodando
2. Consulte o arquivo `INTEGRACAO_INSTRUCOES.md`
3. Verifique os logs do terminal
4. Abra uma issue no GitHub

---

**🎉 Projeto Full-Stack funcionando com sucesso!** 🚀