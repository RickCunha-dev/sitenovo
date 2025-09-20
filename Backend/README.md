
# 🐍 Backend Hackathon

API backend em Python com FastAPI, SQLAlchemy e autenticação JWT.

## 🚀 Como Rodar o Backend

### **Pré-requisitos**
- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### **📋 Passos para Execução**

#### **1. Instalar Dependências**
```bash
pip install -r requirements.txt
```

#### **2. Iniciar Servidor**
```bash
# Opção 1 (recomendada):
python main.py

# Opção 2 (Windows):
py main.py

# Opção 3 (manual):
uvicorn main:app --reload --host 127.0.0.1 --port 8001
```

#### **3. Verificar se está funcionando**
- **API**: http://127.0.0.1:8001
- **Documentação**: http://127.0.0.1:8001/docs
- **Banco de dados**: `hackathon.db` será criado automaticamente

### **🚨 Solução de Problemas**

#### **Erro: Python não encontrado**
```bash
# Windows - usar py launcher:
py main.py

# Verificar instalação:
python --version
py --version
```

#### **Erro: pip não encontrado**
```bash
# Windows:
python -m pip install -r requirements.txt

# Linux/Mac:
python3 -m pip install -r requirements.txt
```

#### **Erro: Porta 8001 já em uso**
```bash
# Usar porta alternativa:
uvicorn main:app --reload --host 127.0.0.1 --port 8002
```

#### **Erro: ModuleNotFoundError**
```bash
# Reinstalar dependências:
pip install --upgrade -r requirements.txt

# Criar ambiente virtual (recomendado):
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install -r requirements.txt
```

## Autenticação

Após login, o usuário recebe um token JWT. Use o token no header `Authorization: Bearer <token>` para acessar rotas protegidas.

## Banco de Dados

Por padrão, utiliza SQLite. Para usar MySQL, altere a string de conexão em `db.py`.

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic passlib bcrypt pyjwt mysql-connector-python
   ```
2. Configure o banco de dados em `db.py`.
3. Inicie o servidor:
   ```bash
   uvicorn main:app --reload
   ```

## Observações

- Certifique-se de definir uma chave secreta forte para o JWT em `security.py`.
- O projeto está pronto para ser expandido com novos endpoints e regras de negócio.

## Autor

Desenvolvido por mariac1995,Nayara ventura, Lucas,Pablo Marcelino,Vitor anastácio,Paula tejando, Kelly guiça, Bruna silva,Ricardo Wemerson e nossos mentores João Pedro Sales e Marcos SImôes, Davi professor, WalTI professor e Gabriel Professor para o Hackathon.
