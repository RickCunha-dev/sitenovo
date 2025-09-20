import requests

# Testar cadastro direto na API
user_data = {
    "nome_completo": "Marcos Paulo Simoes",
    "cpf": "14745893664",
    "email": "mp18887@gmail.com",
    "password": "123456",
    "data_nascimento": "2002-07-22"
}

print("Testando cadastro na API...")
try:
    response = requests.post("http://127.0.0.1:8001/register", json=user_data)
    print(f"Status: {response.status_code}")
    print(f"Resposta: {response.text}")
    
    if response.status_code == 201:
        print("✅ Cadastro realizado com sucesso!")
    else:
        print(f"❌ Erro no cadastro: {response.text}")
        
except Exception as e:
    print(f"❌ Erro de conexão: {e}")