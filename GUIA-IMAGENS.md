# 🖼️ Guia de Imagens - Infinity School

## 📁 Nova Estrutura de Diretórios

Para resolver problemas de compatibilidade entre sistemas operacionais e facilitar o git clone, organizamos todas as imagens em uma estrutura padronizada:

```
HACKATHON-REACT/
├── public/
│   ├── images/           # 🖼️ Imagens públicas (acessíveis via /images/)
│   └── icons/            # 🔷 Ícones públicos (acessíveis via /icons/)
└── src/
    └── assets/
        ├── images/       # 🖼️ Imagens do React (para import)
        └── icons/        # 🔷 Ícones do React (para import)
```

## 🔧 Principais Correções Implementadas

### ✅ 1. Case Sensitivity
- **Antes**: `Imagens/`, `Icones/`, `Logo Padrão.png`
- **Depois**: `images/`, `icons/`, `logo-padrao.png`
- Todos os nomes em minúsculas para compatibilidade Linux/Mac

### ✅ 2. Caracteres Especiais Removidos
- `Logo padrão.png` → `logo-padrao.png`
- `redefinir senha.png` → `redefinir-senha.png`
- `app delivery.png` → `app-delivery.png`
- `campanha digital.webp` → `campanha-digital.webp`

### ✅ 3. Estrutura Consolidada
- Eliminamos diretórios duplicados
- Consolidamos tudo em `public/` (para HTML estático) e `src/assets/` (para React)

### ✅ 4. Otimização de Tamanho
- Removido arquivo `tela inicial leve.gif` (14.4MB)
- Imagens grandes devem ser otimizadas antes do commit

## 🚀 Como Usar as Imagens

### Para Páginas HTML Estáticas:
```html
<!-- Imagens -->
<img src="../public/images/logo-padrao.png" alt="Logo">
<img src="../public/images/infinity.png" alt="Infinity">

<!-- Ícones -->
<img src="../public/icons/search.png" alt="Buscar">
<img src="../public/icons/apple-logo.png" alt="Apple">
```

### Para CSS:
```css
.header {
    background: url('../public/images/login.png') no-repeat;
}
```

### Para React (src/):
```jsx
import logo from '../assets/images/logo-padrao.png';
import searchIcon from '../assets/icons/search.png';
```

## 📋 Lista de Imagens Disponíveis

### 🖼️ Images (`public/images/`):
- `logo-padrao.png` - Logo principal
- `infinity.png` - Logo infinity
- `login.png` - Imagem de fundo do login
- `blog.png` - Imagem do blog
- `hackathon.jpg` - Imagem do hackathon
- E mais 25+ imagens...

### 🔷 Icons (`public/icons/`):
- `search.png` - Ícone de busca/Google
- `apple-logo.png` - Logo da Apple
- `olhoaberto.png` / `olhofechado.png` - Toggle senha
- `instagram.png`, `linkedin.png`, `whatsapp.png` - Redes sociais
- E mais...

## ⚠️ Importante Para Desenvolvedores

### 🔄 Após git clone:
1. Todas as imagens estarão disponíveis automaticamente
2. Não é necessário baixar arquivos separadamente
3. Funciona em Windows, Linux e Mac

### 📝 Ao adicionar novas imagens:
1. **Use apenas minúsculas** no nome do arquivo
2. **Sem espaços** - use hífens: `minha-imagem.png`
3. **Sem acentos** - `padrão` → `padrao`
4. **Coloque no diretório correto**:
   - HTML estático → `public/images/` ou `public/icons/`
   - React → `src/assets/images/` ou `src/assets/icons/`

### 🗂️ Otimização recomendada:
- PNG: < 500KB
- JPG: < 300KB  
- GIF: < 1MB
- Use WebP quando possível para melhor compressão

## 🛠️ Arquivos de Configuração

### `.gitattributes`
Configurado para tratar corretamente arquivos binários:
```
*.png binary
*.jpg binary
*.gif binary
*.svg binary
```

Isso garante que as imagens sejam sempre tratadas como arquivos binários pelo Git, evitando problemas de corrupção.

---

**✨ Com essas mudanças, o projeto agora funciona perfeitamente em qualquer ambiente após git clone!**