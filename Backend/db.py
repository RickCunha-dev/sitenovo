from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from models import Model

import os 
# Usar SQLite como padrão se não houver variável de ambiente
SQLALCHEMY_DATABASE_URL = os.getenv("SQLALCHEMY_DATABASE_URL", "sqlite:///./hackathon.db")


engine = create_engine(SQLALCHEMY_DATABASE_URL, echo=True)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Criar as tabelas
Model.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
if __name__ == "__main__":
    Model.metadata.create_all(bind=engine)