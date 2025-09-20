import requests

# Criar um usuário de teste simples
test_user = {
    "nome_completo": "Usuario Teste",
    "cpf": "11111111111",
    "email": "user@test.com",
    "password": "123456",
    "data_nascimento": "1990-01-01"
}

print("Criando usuário de teste...")
response = requests.post("http://localhost:8001/register", json=test_user)
print(f"Status: {response.status_code}")
if response.status_code == 201:
    print("✅ Usuário criado!")
    print(f"ID: {response.json()['id_usuario']}")
else:
    print(f"Resposta: {response.text}")

print("\nTentando login...")
login_data = {"cpf": "11111111111", "password": "123456"}
response = requests.post("http://localhost:8001/login", json=login_data)
print(f"Status: {response.status_code}")
if response.status_code == 200:
    print("✅ Login successful!")
else:
    print(f"Erro: {response.text}")