# 🪟 Guia Específico para Windows

## ⚡ Instalação Rápida no Windows

### **🚨 IMPORTANTE: Problemas Comuns Resolvidos**

#### **❌ ERRO: "package.json não encontrado"**
**CAUSA**: PowerShell não mudou diretório corretamente com `cd`  
**SOLUÇÃO**: Use `Push-Location` em vez de `cd`

```powershell
# ❌ NÃO FUNCIONA:
cd HACKATHON-REACT
npm run dev

# ✅ FUNCIONA:
Push-Location ".\HACKATHON-REACT"
npm run dev
```

---

## 🔧 Comandos Corretos para Windows

### **1. 📥 Clone o Repositório**
```powershell
git clone https://github.com/RickCunha-dev/sitenovo.git
Push-Location ".\sitenovo"
```

### **2. 🐍 Backend (Terminal 1)**
```powershell
# Navegar para backend
Push-Location ".\Backend"

# Instalar dependências
pip install -r requirements.txt

# Iniciar servidor
python main.py
# OU se python não funcionar:
py main.py
```

### **3. ⚛️ Frontend (Terminal 2 - NOVO)**
```powershell
# IMPORTANTE: Abrir NOVO terminal no VS Code
# Ctrl + Shift + ` (crase)

# Navegar para o projeto
Push-Location "C:\caminho\para\seu\projeto\sitenovo"

# Navegar para frontend
Push-Location ".\HACKATHON-REACT"

# Instalar dependências
npm install

# Iniciar servidor
npm run dev
```

---

## 🚨 Soluções para Erros Específicos do Windows

### **❌ "A conexão com localhost foi recusada"**
```powershell
# 1. Verificar se terminal está no diretório correto
Get-Location

# 2. Se não estiver, navegar corretamente:
Push-Location "C:\caminho\para\sitenovo\HACKATHON-REACT"

# 3. Reinstalar dependências se necessário:
npm install

# 4. Iniciar servidor:
npm run dev
```

### **❌ Python não encontrado**
```powershell
# Testar diferentes comandos:
python --version
py --version
python3 --version

# Verificar PATH:
where python
where py

# Se não funcionar, instalar Python via Microsoft Store
```

### **❌ Node.js/npm não encontrado**
```powershell
# Verificar instalação:
node --version
npm --version

# Se não funcionar, baixar do site oficial:
# https://nodejs.org/
```

---

## 🎯 Verificação de Funcionamento

### **✅ Backend Funcionando**
- Terminal mostra: `INFO: Uvicorn running on http://127.0.0.1:8001`
- Acesse: http://127.0.0.1:8001/docs

### **✅ Frontend Funcionando** 
- Terminal mostra: `Local: http://localhost:5173/`
- Acesse: http://localhost:5173

---

## 🔄 Comandos de Emergência

```powershell
# Resetar projeto completo:
git pull origin main --force

# Limpar cache npm:
npm cache clean --force

# Reinstalar dependências frontend:
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install

# Reinstalar dependências backend:
pip install --upgrade -r requirements.txt
```

---

## 💡 Dicas do PowerShell

```powershell
# Sempre use aspas duplas para caminhos com espaços:
Push-Location ".\pasta com espaços\HACKATHON-REACT"

# Use Tab para autocompletar caminhos
Push-Location ".\HAC[TAB]

# Verificar diretório atual:
Get-Location

# Listar arquivos:
Get-ChildItem
# OU simplesmente:
ls
```

---

**🎉 Seguindo estas instruções, o projeto vai funcionar perfeitamente no Windows!** 🚀