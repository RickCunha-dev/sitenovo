import requests
import json

# URL do backend
BASE_URL = "http://localhost:8001"

# Dados para teste
test_user = {
    "nome_completo": "Teste Usuario",
    "cpf": "99999999999",
    "email": "teste@teste.com",
    "password": "senha123",
    "data_nascimento": "1990-01-01"
}

print("=== TESTE DE CADASTRO E LOGIN ===")

# 1. Cadastrar usuário
print("\n1. Cadastrando usuário...")
try:
    response = requests.post(f"{BASE_URL}/register", json=test_user)
    print(f"Status cadastro: {response.status_code}")
    if response.status_code == 201:
        print("✅ Cadastro realizado com sucesso!")
        user_data = response.json()
        print(f"Usuário criado: ID {user_data['id_usuario']}")
    else:
        print(f"❌ Erro no cadastro: {response.text}")
        exit()
except Exception as e:
    print(f"❌ Erro na conexão: {e}")
    exit()

# 2. Tentar fazer login
print("\n2. Tentando fazer login...")
login_data = {
    "cpf": test_user["cpf"],
    "password": test_user["password"]
}

try:
    response = requests.post(f"{BASE_URL}/login", json=login_data)
    print(f"Status login: {response.status_code}")
    if response.status_code == 200:
        print("✅ Login realizado com sucesso!")
        token_data = response.json()
        print(f"Token recebido: {token_data['access_token'][:50]}...")
    else:
        print(f"❌ Erro no login: {response.text}")
        print(f"Dados enviados: {login_data}")
except Exception as e:
    print(f"❌ Erro na conexão: {e}")