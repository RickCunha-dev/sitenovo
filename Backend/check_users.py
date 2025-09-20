#!/usr/bin/env python3
import sys
import os

# Adicionar o diretório atual ao Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)
os.chdir(current_dir)

from sqlalchemy.orm import Session
from db import SessionLocal
from models import Usuario

def check_users():
    db = SessionLocal()
    try:
        users = db.query(Usuario).all()
        print(f"Total de usuários no banco: {len(users)}")
        
        if users:
            print("\nUsuários cadastrados:")
            for user in users:
                print(f"- ID: {user.id_usuario}")
                print(f"  Nome: {user.nome_completo}")
                print(f"  CPF: {user.cpf}")
                print(f"  Email: {user.email}")
                print(f"  Ativo: {user.is_active}")
                print(f"  Admin: {user.is_admin}")
                print(f"  Data criação: {user.data_criacao}")
                print(f"  Hash senha: {user.password_hash[:20]}...")
                print("---")
        else:
            print("Nenhum usuário encontrado no banco de dados.")
            
    except Exception as e:
        print(f"Erro ao verificar usuários: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    check_users()