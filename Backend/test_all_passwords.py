import sqlite3
from passlib.context import CryptContext

# Configuração do bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Conectar ao banco
conn = sqlite3.connect('hackathon.db')
cursor = conn.cursor()

# Pegar um usuário de exemplo
cursor.execute("SELECT cpf, password_hash FROM usuarios WHERE id_usuario = 1;")
user = cursor.fetchone()

if user:
    cpf, password_hash = user
    print(f"CPF: {cpf}")
    print(f"Hash: {password_hash}")
    
    # Testar várias senhas possíveis
    possible_passwords = [
        "123456",
        "12345678",
        "password", 
        "senha",
        "123",
        "admin",
        "ricardo",
        "Rick123",
        "13354678914",  # próprio CPF
        ""  # senha vazia
    ]
    
    print("\nTestando possíveis senhas:")
    for pwd in possible_passwords:
        try:
            is_valid = pwd_context.verify(pwd, password_hash)
            print(f"'{pwd}' -> {is_valid}")
            if is_valid:
                print(f"✅ SENHA ENCONTRADA: '{pwd}'")
                break
        except Exception as e:
            print(f"'{pwd}' -> Erro: {e}")

conn.close()