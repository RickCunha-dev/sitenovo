from fastapi import FastAPI, Depends
from fastapi import HTTPException
# import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
# from passlib.context import CryptContext
# from jose import jwt, JWTError
from datetime import timedelta, datetime
from pydantic import BaseModel, EmailStr
from db import get_db
from models import Usuario
from schemas import UserCreate, UserLogin, UserOut as User, PasswordReset
from security import create_access_token, get_current_user
from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from utils2 import enviar_email



pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def get_password_hash(password):
    return pwd_context.hash(password)


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

app = FastAPI()
origins = [
        "*"
        # Add other allowed origins here
    ]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.post("/register", status_code=201, response_model=User)
async def register(user: UserCreate, db: Session = Depends(get_db)):
    if (
        db.query(Usuario)
        .filter((Usuario.cpf == user.cpf) | (Usuario.email == user.email))
        .first()
    ):
        raise HTTPException(status_code=409, detail="CPF ou email já cadastrado.")
    password_hash = get_password_hash(user.password)
    novo_usuario = Usuario(
        nome_completo=user.nome_completo,
        cpf=user.cpf,
        email=user.email,
        password_hash=password_hash,
        data_nascimento=user.data_nascimento,
    )
    db.add(novo_usuario)
    db.commit()
    db.refresh(novo_usuario)
    return novo_usuario

@app.post("/login")
async def login(user: UserLogin, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.cpf == user.cpf).first()
    if not usuario or not verify_password(user.password, usuario.password_hash):
        raise HTTPException(status_code=401, detail="CPF ou senha inválidos.")
    access_token = create_access_token(
        data={
            "sub": str(usuario.id_usuario),
            "tipo": "admin" if usuario.is_admin else "regular",
        }
    )
    return {
        "access_token": access_token, 
        "token_type": "bearer",
        "user": {
            "id": usuario.id_usuario,
            "nome_completo": usuario.nome_completo,
            "email": usuario.email,
            "cpf": usuario.cpf,
            "is_admin": usuario.is_admin
        }
    }

# implementar a parte de disparo de email

@app.get("/recuperarsenha/{cpf}")
def recover_password(cpf: str, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.cpf == cpf).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="CPF não encontrado.")
    try:
        enviar_email(usuario.email)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Erro ao enviar email: {str(e)}")
    return {"message": "Email de recuperação enviado com sucesso."}

@app.post("/redefinirsenha")
def reset_password(data: PasswordReset, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.cpf == data.cpf).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="CPF não encontrado.")
    usuario.password_hash = get_password_hash(data.new_password)
    db.commit()
    return {"message": "Senha redefinida com sucesso."}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8001)