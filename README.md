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

## 🚀 Como Rodar o Projeto

### **Pré-requisitos**
- **Node.js** (v16 ou superior) - [Download aqui](https://nodejs.org/)
- **Python** (v3.8 ou superior) - [Download aqui](https://python.org/)
- **Git** - [Download aqui](https://git-scm.com/)

---

### **⚡ Guia Rápido (Instalação Completa)**

> 🪟 **USUÁRIOS WINDOWS**: Se estiver usando Windows, consulte o arquivo [`WINDOWS_SETUP.md`](./WINDOWS_SETUP.md) para instruções específicas e solução de problemas comuns.

#### **1. 📥 Clone o Repositório**
```bash
git clone https://github.com/RickCunha-dev/sitenovo.git
cd sitenovo
```

#### **2. 🐍 Configurar e Iniciar Backend**
```bash
# Navegar para o backend
cd Backend

# Instalar dependências Python
pip install -r requirements.txt

# Iniciar servidor FastAPI
python main.py
# OU (dependendo da sua instalação):
py main.py
# OU:
uvicorn main:app --reload --port 8001
```
✅ **Backend rodando em**: http://127.0.0.1:8001

#### **3. ⚛️ Configurar e Iniciar Frontend**
**Em outro terminal:**

**📋 IMPORTANTE - Windows PowerShell:**
```powershell
# Se estiver no Windows, use estes comandos:
# Navegar para o frontend (comando exato)
Push-Location ".\HACKATHON-REACT"

# Instalar dependências Node.js
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

**📋 Para Linux/Mac:**
```bash
# Navegar para o frontend
cd HACKATHON-REACT

# Instalar dependências Node.js
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```
✅ **Frontend rodando em**: http://localhost:5173

#### **4. 🌐 Acessar a Aplicação**
- **🎨 Frontend**: http://localhost:5173
- **🔧 Backend API**: http://127.0.0.1:8001
- **📚 Documentação API**: http://127.0.0.1:8001/docs

---

### **🚨 Solução de Problemas Comuns**

#### **Problema: Python não encontrado**
```bash
# Windows - usar py launcher:
py main.py

# Windows - instalar via Microsoft Store:
python3 main.py

# Windows - verificar PATH:
where python
```

#### **Problema: npm não encontrado**
```bash
# Verificar instalação do Node.js:
node --version
npm --version

# Reinstalar Node.js se necessário
```

#### **Problema: Porta já em uso**
```bash
# Backend - mudar porta:
uvicorn main:app --reload --port 8002

# Frontend - mudar porta:
npm run dev -- --port 5174
```

#### **❌ ERRO COMUM: "package.json não encontrado" no Windows**
```powershell
# SOLUÇÃO: Use Push-Location em vez de cd
Push-Location ".\HACKATHON-REACT"
npm run dev

# OU use o caminho completo:
Push-Location "C:\caminho\para\seu\projeto\sitenovo\HACKATHON-REACT"
npm run dev
```

#### **❌ ERRO: "A conexão com localhost foi recusada"**
```bash
# 1. Verifique se o servidor está rodando
# 2. Se não estiver, reinicie:
cd HACKATHON-REACT
npm run dev

# 3. Verifique se a porta 5173 não está ocupada
```

#### **✅ PROBLEMA RESOLVIDO: Imagens não carregam após git clone**
**JÁ CORRIGIDO!** As imagens foram reorganizadas e são compatíveis cross-platform:
- ✅ Nomes sem espaços ou acentos  
- ✅ Caminhos padronizados em `/public/images/`
- ✅ Funciona em Windows, Linux e Mac

#### **Problema: Dependências não instaladas**
```bash
# Backend - reinstalar:
pip install --upgrade -r requirements.txt

# Frontend - limpar cache e reinstalar:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

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