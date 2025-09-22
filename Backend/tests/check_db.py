import sqlite3

# Conectar ao banco de dados
conn = sqlite3.connect('hackathon.db')
cursor = conn.cursor()

# Verificar se a tabela existe
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()
print("Tabelas no banco:", tables)

# Verificar usuários cadastrados
try:
    cursor.execute("SELECT id_usuario, nome_completo, cpf, email FROM usuarios LIMIT 10;")
    users = cursor.fetchall()
    print(f"\nTotal de usuários: {len(users)}")
    for user in users:
        print(f"ID: {user[0]}, Nome: {user[1]}, CPF: {user[2]}, Email: {user[3]}")
        
    # Verificar a estrutura da tabela
    cursor.execute("PRAGMA table_info(usuarios);")
    columns = cursor.fetchall()
    print("\nEstrutura da tabela usuarios:")
    for col in columns:
        print(f"Coluna: {col[1]}, Tipo: {col[2]}")
        
except Exception as e:
    print(f"Erro: {e}")

conn.close()