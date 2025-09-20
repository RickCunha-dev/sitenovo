
# Backend Hackathon

API backend em Python com FastAPI, SQLAlchemy e autenticação JWT.

## Funcionalidades

- Cadastro e login de usuários (com validação de CPF, e-mail e senha)
- Autenticação JWT (Bearer Token)
- Consulta de dados do usuário autenticado
- Hash de senha seguro com bcrypt
- Integração com banco de dados SQLite (padrão, mas pode ser adaptado para MySQL)
- Endpoints protegidos

## Estrutura do Projeto

```
Backend/
├── db.py           # Configuração do banco de dados
├── main.py         # Endpoints da API FastAPI
├── models.py       # Modelos ORM (SQLAlchemy)
├── schemas.py      # Schemas Pydantic
├── security.py     # Funções de autenticação e token
├── utils.py        # Funções auxiliares
├── requirements.txt
└── README.md
```

## Endpoints Principais

- `POST /register` — Cadastro de novo usuário
- `POST /login` — Login e geração de token JWT
- `GET /users/me` — Consulta de dados do usuário autenticado

## Como rodar

1. Instale as dependências:
   ```
   pip install -r requirements.txt
   ```
2. Inicie o servidor:
   ```
   uvicorn main:app --reload --host 127.0.0.1 --port 8001
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
