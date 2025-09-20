# Instruções para Finalizar a Integração Backend + Frontend

## ✅ O que já foi configurado:

1. **Axios instalado** no projeto React
2. **Serviços de API** criados (`api.js` e `authService.js`)
3. **Contexto de autenticação** configurado (`AuthContext.jsx`)
4. **Componentes React** para Login e Cadastro criados
5. **App.jsx** atualizado com AuthProvider

## 🔄 Próximos passos:

### 1. Instalar Python e configurar o backend

Você precisa instalar o Python primeiro:
- Download: https://www.python.org/downloads/
- Durante a instalação, marque "Add Python to PATH"

Depois execute no terminal (PowerShell):
```bash
cd "c:\Users\ricar\OneDrive\Desktop\HACKATHON PROJETC\Backend"
pip install -r requirements.txt
```

### 2. Configurar o banco de dados

Verifique o arquivo `db.py` e `models.py` para configurar seu banco de dados.
Se estiver usando SQLite, o banco será criado automaticamente.

### 3. Iniciar o servidor backend

```bash
cd "c:\Users\ricar\OneDrive\Desktop\HACKATHON PROJETC\Backend"
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

O servidor ficará disponível em: http://localhost:8000

### 4. Iniciar o frontend React

Em outro terminal:
```bash
cd "c:\Users\ricar\OneDrive\Desktop\HACKATHON PROJETC\HACKATHON-REACT"
npm run dev
```

### 5. Atualizar as páginas existentes

Você pode escolher uma das opções:

**Opção A: Usar os novos componentes React**
- Substitua o conteúdo das páginas existentes (`src/pages/Login.jsx` e `src/pages/Cadastro.jsx`) pelos componentes que criamos

**Opção B: Integrar JavaScript existente**
- Adicione as chamadas de API aos arquivos JS existentes (`Pag_login/login.js` e `Pag_Cadastro/Cadastro.js`)

### 6. Testar a integração

1. **Teste de cadastro:**
   - Preencha o formulário de cadastro
   - Verifique se o usuário é criado no backend
   - Confirme se recebe mensagem de sucesso

2. **Teste de login:**
   - Use as credenciais criadas no cadastro
   - Verifique se recebe o token de acesso
   - Confirme se é redirecionado para a página principal

## 📁 Arquivos criados:

```
src/
├── services/
│   ├── api.js              # Configuração base do axios
│   └── authService.js      # Serviços de autenticação
├── contexts/
│   └── AuthContext.jsx     # Contexto React para auth
└── components/
    ├── Login.jsx           # Componente de login
    └── Cadastro.jsx        # Componente de cadastro
```

## 🔧 Configurações importantes:

1. **CORS**: Já configurado no backend para aceitar todas as origens
2. **Token de acesso**: Salvo automaticamente no localStorage
3. **Interceptors**: Configurados para adicionar token nas requisições
4. **Validações**: Implementadas no frontend (CPF, senhas, etc.)

## ⚠️ Possíveis problemas:

1. **CORS Error**: Certifique-se que o backend está rodando na porta 8000
2. **502 Bad Gateway**: Backend não está rodando
3. **401 Unauthorized**: Token expirado ou inválido

## 📚 Para adicionar novos endpoints:

1. Adicione no backend (`main.py`)
2. Crie função correspondente em `authService.js`
3. Use no componente React com `useAuth()`

Precisa de ajuda com algum passo específico?