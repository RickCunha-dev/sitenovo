import requests

# Testar login e verificar resposta completa
login_data = {"cpf": "11111111111", "password": "123456"}
response = requests.post("http://localhost:8001/login", json=login_data)

print(f"Status: {response.status_code}")
if response.status_code == 200:
    print("✅ Login successful!")
    data = response.json()
    print(f"Resposta completa: {data}")
    print(f"Token: {data.get('access_token', 'N/A')[:50]}...")
    print(f"Dados do usuário: {data.get('user', 'N/A')}")
else:
    print(f"Erro: {response.text}")