#!/usr/bin/env python3
import os
import sys
import uvicorn

# Adicionar o diretório atual ao Python path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, current_dir)

# Mudar para o diretório do script
os.chdir(current_dir)

print(f"Current directory: {os.getcwd()}")
print(f"Python path includes: {current_dir}")

try:
    from main import app
    print("Successfully imported main.app")
    
    if __name__ == "__main__":
        uvicorn.run(
            "main:app", 
            host="127.0.0.1", 
            port=8001, 
            reload=True,
            log_level="info"
        )
        
except ImportError as e:
    print(f"Import error: {e}")
    sys.exit(1)
except Exception as e:
    print(f"Error: {e}")
    sys.exit(1)