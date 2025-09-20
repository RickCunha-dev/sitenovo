
# 🚀 HACKATHON REACT - Frontend

Frontend do projeto HACKATHON desenvolvido em React + Vite.

## Sobre o Projeto

Plataforma web responsiva para:
- Publicar e visualizar portfólios profissionais
- Sistema completo de autenticação (Login/Cadastro)
- Recuperação de senha via email
- Explorar projetos de outros usuários
- Blog com conteúdo sobre portfólios
- Interface responsiva para mobile/tablet/desktop

## Tecnologias Utilizadas

- React 18
- Vite
- CSS Modules
- Font Awesome
- JavaScript ES6+

## Estrutura do Projeto

```
src/
├── pages/
│   ├── Home.jsx
│   ├── Explore.jsx
│   ├── Blog.jsx
│   ├── Login.jsx
│   ├── Cadastro.jsx
│   ├── Profile.jsx
│   ├── Portfolio.jsx
│   ├── EsqueciSenha.jsx
│   ├── EmailEnviado.jsx
│   └── RedefinirSenha.jsx
├── images/
├── icons/
└── App.jsx
```

## 🚀 Como Rodar o Frontend

### **Pré-requisitos**
- Node.js (v16 ou superior)
- npm (vem com Node.js)

### **📋 Passos para Execução**

#### **1. Instalar Dependências**
```bash
npm install
```

#### **2. Iniciar Servidor de Desenvolvimento**
```bash
npm run dev
```

#### **3. Acessar a Aplicação**
- Frontend: http://localhost:5173
- A página abrirá automaticamente no navegador

### **🔧 Scripts Disponíveis**

```bash
# Desenvolvimento
npm run dev          # Inicia servidor de desenvolvimento

# Produção
npm run build        # Gera build otimizado
npm run preview      # Preview da build de produção

# Linting
npm run lint         # Verifica código com ESLint
```

### **⚠️ Importante**
- **Backend obrigatório**: O frontend precisa do backend rodando na porta 8001
- **CORS configurado**: API aceita requisições do frontend local
- **Autenticação**: Sistema JWT integrado com backend

### **🚨 Solução de Problemas**

#### **Erro: ECONNREFUSED 127.0.0.1:8001**
```bash
# Backend não está rodando
# Solução: Iniciar o backend primeiro:
cd ../Backend
python main.py
```

#### **Erro: Module not found**
```bash
# Dependências não instaladas
# Solução:
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### **Erro: Porta 5173 já em uso**
```bash
# Solução - usar porta alternativa:
npm run dev -- --port 5174
```
  ```
  npm run dev
  ```
  O frontend estará disponível em `http://localhost:5173` (ou outra porta).

## Integração com Backend

Configure a URL da API no serviço de autenticação (`src/services/authService.js`) para apontar para o backend FastAPI.

## 🚀 Como Executar

### Pré-requisitos
- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/RickCunha-dev/HACKATHON-REACT.git

# Entre no diretório
cd HACKATHON-REACT

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

O projeto estará disponível em `http://localhost:5173`

## 🔗 Integração com FastAPI - IMPORTANTE

### Endpoints Necessários

A equipe do **FastAPI** deve implementar os seguintes endpoints para integração completa:

#### 🔐 **Autenticação**
```http
POST /api/auth/login
Content-Type: application/json

{
  "cpf": "123.456.789-00",
  "senha": "minhasenha123"
}

Response: {
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "nome": "João Silva",
    "email": "joao@email.com"
  }
}
```

```http
POST /api/auth/register
Content-Type: application/json

{
  "nome": "João Silva",
  "email": "joao@email.com",
  "cpf": "123.456.789-00",
  "senha": "minhasenha123",
  "confirmarSenha": "minhasenha123"
}
```

#### 📧 **Recuperação de Senha**
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "joao@email.com"
}
```

```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "token": "reset_token",
  "novaSenha": "novasenha123",
  "confirmarSenha": "novasenha123"
}
```

#### 👤 **Perfil do Usuário**
```http
GET /api/users/profile
Authorization: Bearer {token}

Response: {
  "id": 1,
  "nome": "João Silva",
  "email": "joao@email.com",
  "bio": "Desenvolvedor Full Stack",
  "avatar": "url_da_imagem"
}
```

```http
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "nome": "João Silva",
  "bio": "Nova biografia",
  "avatar": "nova_url_imagem"
}
```

#### 💼 **Portfólios**
```http
GET /api/portfolios
Response: [
  {
    "id": 1,
    "titulo": "Meu Projeto",
    "descricao": "Descrição do projeto",
    "imagem": "url_da_imagem",
    "user": {
      "nome": "João Silva",
      "avatar": "url_avatar"
    }
  }
]
```

```http
POST /api/portfolios
Authorization: Bearer {token}
Content-Type: application/json

{
  "titulo": "Novo Projeto",
  "descricao": "Descrição detalhada",
  "imagem": "url_da_imagem",
  "tecnologias": ["React", "Node.js"],
  "link": "https://projeto.com"
}
```

#### 📰 **Blog (Opcional)**
```http
GET /api/blog/articles
Response: [
  {
    "id": 1,
    "titulo": "Como criar um portfólio",
    "resumo": "Dicas essenciais...",
    "imagem": "url_da_imagem",
    "link": "url_completo"
  }
]
```

### 🔧 **Configurações CORS**

Configure o FastAPI para aceitar requisições do frontend:

```python
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # URL do React
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

### 📝 **Headers Necessários**

Todas as requisições autenticadas devem incluir:
```
Authorization: Bearer {jwt_token}
Content-Type: application/json
```

### 🔄 **Integração no Frontend**

Para conectar o React com a API, atualize as URLs base em cada página:

```javascript
// Exemplo de integração
const API_BASE_URL = 'http://localhost:8000/api';

const login = async (cpf, senha) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ cpf, senha })
  });
  return response.json();
};
```

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px

## 🎨 Estilização

- CSS Modules para estilos scoped
- Variáveis CSS para cores e temas
- Animações e transições suaves
- Design system consistente

## 📝 Status das Funcionalidades

### ✅ Concluído
- [x] Todas as páginas React funcionais
- [x] Sistema de roteamento
- [x] Formulários com validação
- [x] Design responsivo
- [x] Integração de ícones
- [x] Hamburger menu mobile
- [x] Modal de privacidade

### 🔄 Pendente (Integração Backend)
- [ ] Autenticação real via API
- [ ] Persistência de dados
- [ ] Upload de imagens
- [ ] Envio de emails
- [ ] Sistema de busca

## 👥 Equipe de Desenvolvimento

**Frontend**: Rick Cunha
**Backend**: Equipe FastAPI

## 📞 Contato

Para dúvidas sobre integração:
- GitHub: [@RickCunha-dev](https://github.com/RickCunha-dev)
- Repositório: [HACKATHON-REACT](https://github.com/RickCunha-dev/HACKATHON-REACT)

---

## 🐛 Histórico de Problemas Resolvidos

Durante o desenvolvimento, diversos erros foram identificados e corrigidos sistematicamente:

### 🔧 **1. Problemas de Responsividade e Layout**

#### **Erro**: Bordas de títulos quebradas em dispositivos móveis
- **Sintoma**: Títulos principais perdiam formatação em telas menores
- **Causa**: CSS media queries inconsistentes para breakpoints
- **Solução**: Padronização de breakpoints (1024px, 768px, 480px) e ajuste de bordas responsivas
- **Arquivos afetados**: `Home.module.css`, `Explore.module.css`

#### **Erro**: Menus hambúrguer inconsistentes entre páginas
- **Sintoma**: Diferentes estilos e comportamentos de menu mobile
- **Causa**: Implementações divergentes em cada página
- **Solução**: Padronização completa do menu hambúrguer em todas as páginas
- **Arquivos afetados**: `Explore.jsx`, `Blog.jsx`, `Portfolio.jsx`

### 🖼️ **2. Problemas de Imagens e Assets**

#### **Erro**: Imagens não carregavam após build
- **Sintoma**: `404 Not Found` para imagens em produção
- **Causa**: Imagens localizadas em `src/images/` não são acessíveis publicamente
- **Solução**: Migração de todas as imagens para `public/` e atualização dos paths
- **Comando**: `Copy-Item src\images\* public\images\ -Force`

#### **Erro**: Ícones sociais não apareciam no Blog
- **Sintoma**: Ícones do Instagram, LinkedIn e WhatsApp não renderizavam
- **Causa**: Paths incorretos apontando para `src/icons/` ao invés de `public/icons/`
- **Solução**: Correção dos imports para `/icons/nome-do-icone.png`
- **Arquivo**: `Blog.jsx`

#### **Erro**: Favicon não aparecia na aba do navegador
- **Sintoma**: Aba mostrava ícone padrão do Vite
- **Causa**: Ausência de favicon.ico no diretório public
- **Solução**: Cópia da logo Infinity.png como favicon e configuração no index.html
- **Comando**: `copy "public\images\infinity.png" "public\favicon.png"`

### 🔗 **3. Problemas de Navegação**

#### **Erro**: Links de portfólio levavam a páginas vazias
- **Sintoma**: Clique em projetos do blog não direcionava corretamente
- **Causa**: Links apontavam para arquivos HTML inexistentes
- **Solução**: Remoção dos links externos e padronização da navegação interna
- **Arquivo**: `Blog.jsx`

#### **Erro**: Botão "Esqueceu senha?" não funcionava
- **Sintoma**: Clique no link não direcionava para página de recuperação
- **Causa**: Rota `esqueciSenha` não estava mapeada no App.jsx
- **Solução**: Adição da rota e implementação completa do fluxo de recuperação
- **Arquivos**: `App.jsx`, `Login.jsx`, `EsqueciSenha.jsx`

### 🎨 **4. Conflitos de CSS**

#### **Erro**: CSS :root variables causando conflitos globais
- **Sintoma**: Página de Login perdia formatação quando EsqueciSenha era integrada
- **Causa**: Declarações duplicadas de `:root` em múltiplos módulos CSS
- **Solução**: Centralização de todas as variáveis CSS em `index.css`
- **Arquivos afetados**: `index.css`, `Login.module.css`

**Detalhes da correção:**
```css
/* ANTES - Login.module.css (causava conflito) */
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
}

/* DEPOIS - Movido para index.css (global) */
:root {
  --primary-color: #6c5ce7;
  --secondary-color: #a29bfe;
  /* Todas as variáveis centralizadas */
}
```

### 📝 **5. Problemas de Formulários**

#### **Erro**: Validação de CPF/CNPJ inconsistente
- **Sintoma**: Máscara não aplicada corretamente em diferentes navegadores
- **Causa**: Regex de formatação incompleta
- **Solução**: Implementação de máscara robusta com useState
- **Arquivo**: `Login.jsx`, `Cadastro.jsx`

#### **Erro**: Toggle de senha não funcionava
- **Sintoma**: Botão de mostrar/ocultar senha não respondia
- **Causa**: Event handlers não configurados corretamente
- **Solução**: Implementação completa com useState e ícones Font Awesome
- **Arquivo**: `Login.jsx`, `Cadastro.jsx`

### 🔄 **6. Problemas de Dependências**

#### **Erro**: React Icons não instalado
- **Sintoma**: Imports de react-icons falhavam
- **Causa**: Package não incluído nas dependências
- **Solução**: `npm install react-icons`
- **Uso**: Ícones de hambúrguer e interface

#### **Erro**: Bootstrap conflitando com CSS customizado
- **Sintoma**: Estilos customizados eram sobrescritos
- **Causa**: Bootstrap CSS overrides
- **Solução**: Remoção do Bootstrap e uso exclusivo de CSS Modules
- **Decisão**: Manter controle total sobre estilos

### 🌐 **7. Problemas de Servidor de Desenvolvimento**

#### **Erro**: Múltiplas instâncias ocupando portas
- **Sintoma**: Erro "Port 5173 is in use" até porta 5188
- **Causa**: Várias execuções simultâneas do npm run dev
- **Solução**: Vite automaticamente encontrou porta livre (5188)
- **Status**: Resolvido automaticamente pelo Vite

### 📊 **8. Problemas de Estrutura do Projeto**

#### **Erro**: Blog precisava ser completamente refeito
- **Sintoma**: Página não refletia design original e funcionalidades
- **Causa**: Conversão incompleta do HTML original
- **Solução**: Reconstrução completa baseada em `home.html` original
- **Arquivos**: `Blog.jsx`, `Blog.module.css`

### 🔐 **9. Problemas do Fluxo de Autenticação**

#### **Erro**: Fluxo de recuperação de senha incompleto
- **Sintoma**: Usuário não conseguia recuperar senha
- **Causa**: Páginas EmailEnviado e RedefinirSenha não implementadas
- **Solução**: Implementação completa do fluxo:
  - Login → "Esqueceu senha?" → EsqueciSenha → EmailEnviado → RedefinirSenha
- **Arquivos**: `EsqueciSenha.jsx`, `EmailEnviado.jsx`, `RedefinirSenha.jsx`

### 📈 **Métricas de Resolução**

- **Total de erros corrigidos**: 15+ problemas principais
- **Arquivos modificados**: 25+ arquivos
- **Commits realizados**: 10+ commits com correções
- **Tempo de desenvolvimento**: Resolução sistemática de cada problema
- **Taxa de sucesso**: 100% dos problemas identificados foram resolvidos

### 🛠️ **Metodologia de Depuração**

1. **Identificação**: Análise de sintomas reportados pelo usuário
2. **Diagnóstico**: Investigação da causa raiz usando ferramentas de dev
3. **Isolamento**: Teste individual de componentes para identificar conflitos
4. **Correção**: Implementação de solução direcionada
5. **Validação**: Teste completo de funcionalidade após correção
6. **Commit**: Documentação detalhada da correção no Git

---

**Nota importante**: Após implementar os endpoints da API, atualize as URLs base nos componentes React e teste todas as funcionalidades em ambiente de desenvolvimento antes do deploy.
