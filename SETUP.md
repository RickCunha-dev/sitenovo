# 🚀 Setup Completo - HACKATHON PROJECT

## ⚡ Instalação Rápida (Para Novos Desenvolvedores)

### **1. 📋 Verificar Pré-requisitos**

#### **Node.js (Frontend)**
```bash
node --version  # Deve ser v16 ou superior
npm --version   # Deve estar presente
```
❌ **Se não estiver instalado**: [Download Node.js](https://nodejs.org/)

#### **Python (Backend)**
```bash
python --version  # Deve ser v3.8 ou superior
# OU:
py --version     # Windows alternative
```
❌ **Se não estiver instalado**: [Download Python](https://python.org/)

---

### **2. 🔽 Clonar e Configurar**

```bash
# Clone o repositório
git clone https://github.com/RickCunha-dev/sitenovo.git
cd sitenovo
```

---

### **3. 🐍 Setup Backend (Terminal 1)**

```bash
# Navegar para backend
cd Backend

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python main.py
```

✅ **Backend funcionando**: http://127.0.0.1:8001  
📚 **Documentação API**: http://127.0.0.1:8001/docs

---

### **4. ⚛️ Setup Frontend (Terminal 2)**

```bash
# Navegar para frontend (novo terminal)
cd HACKATHON-REACT

# Instalar dependências
npm install

# Iniciar desenvolvimento
npm run dev
```

✅ **Frontend funcionando**: http://localhost:5173

---

## 🎯 Teste Rápido

1. **Acesse**: http://localhost:5173
2. **Cadastre** um usuário
3. **Faça login** com as credenciais
4. **Explore** as funcionalidades

---

## 🚨 Problemas Comuns & Soluções

### **❌ Python não encontrado**
```bash
# Windows - tentar:
py main.py

# Verificar PATH:
where python
where py

# Instalar via Microsoft Store se necessário
```

### **❌ npm comando não encontrado**
```bash
# Verificar se Node.js foi instalado:
node --version

# Reinstalar Node.js se necessário
```

### **❌ Porta já em uso**
```bash
# Backend - porta alternativa:
uvicorn main:app --reload --port 8002

# Frontend - porta alternativa:
npm run dev -- --port 5174
```

### **❌ Erro de dependências**
```bash
# Backend - reinstalar:
pip install --upgrade -r requirements.txt

# Frontend - limpar cache:
npm cache clean --force
rm -rf node_modules
npm install
```

### **❌ CORS / API não responde**
```bash
# Verificar se backend está rodando:
curl http://127.0.0.1:8001/docs

# Verificar logs do backend no terminal
```

---

## 🔧 Comandos Úteis

### **Backend**
```bash
# Verificar dependências
pip list

# Gerar requirements atualizado
pip freeze > requirements.txt

# Rodar em modo debug
uvicorn main:app --reload --log-level debug
```

### **Frontend**
```bash
# Build para produção
npm run build

# Preview da build
npm run preview

# Verificar problemas
npm run lint
```

---

## 📁 Estrutura Final

```
HACKATHON PROJECT/
├── 📂 Backend/              # API Python
│   ├── main.py             # ✅ Servidor FastAPI
│   ├── requirements.txt    # ✅ Dependências
│   └── hackathon.db        # ✅ Auto-gerado
│
├── 📂 HACKATHON-REACT/     # Frontend React
│   ├── package.json        # ✅ Dependências
│   ├── node_modules/       # ✅ Auto-gerado
│   └── src/                # ✅ Código React
│
├── .gitignore              # ✅ Configurado
├── README.md               # ✅ Documentação
└── SETUP.md                # ✅ Este arquivo
```

---

## ✅ Checklist de Sucesso

- [ ] Node.js e Python instalados
- [ ] Repositório clonado
- [ ] Backend rodando na porta 8001
- [ ] Frontend rodando na porta 5173
- [ ] Cadastro/Login funcionando
- [ ] Navegação entre páginas OK

---

## 🆘 Suporte

Se ainda tiver problemas:

1. **Verifique os logs** nos terminais
2. **Consulte** http://127.0.0.1:8001/docs para testar API
3. **Reinicie** ambos os servidores
4. **Abra uma issue** no GitHub com detalhes do erro

---

**🎉 Projeto funcionando com sucesso!** 🚀