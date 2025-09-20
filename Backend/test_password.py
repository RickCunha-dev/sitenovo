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
    print(f"Hash da senha: {password_hash}")
    print(f"Tamanho do hash: {len(password_hash)}")
    
    # Tentar verificar uma senha de teste
    test_password = "123456"  # Use a senha que você usou no cadastro
    print(f"\nTestando senha: {test_password}")
    
    # Verificar se o hash é válido
    try:
        is_valid = pwd_context.verify(test_password, password_hash)
        print(f"Senha correta? {is_valid}")
    except Exception as e:
        print(f"Erro na verificação: {e}")
        
    # Criar um novo hash para comparar
    new_hash = pwd_context.hash(test_password)
    print(f"\nNovo hash para '{test_password}': {new_hash}")
    print(f"Novo hash é válido? {pwd_context.verify(test_password, new_hash)}")

conn.close()