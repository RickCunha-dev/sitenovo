import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
# Configurações
EMAIL_USER = str(os.getenv("EMAIL_USER"))
EMAIL_PASSWORD = str(os.getenv("EMAIL_PASSWORD"))
EMAIL_PORT = int(os.getenv("EMAIL_PORT", 587))

# Dados do destinatário
to_email = "pablo031martins@gmail.com"
subject = "Teste de envio de email"
body = "Olá! Esse é um teste de envio de e-mail usando smtplib no Python."

# Montar mensagem
msg = MIMEMultipart()
msg["From"] = EMAIL_USER
msg["To"] = to_email
msg["Subject"] = subject
msg.attach(MIMEText(body, "plain"))

try:
    # Conectar ao servidor
    with smtplib.SMTP(EMAIL_USER, EMAIL_PORT) as server:
        server.starttls()  # habilita segurança
        server.login(EMAIL_USER, EMAIL_PASSWORD)
        server.send_message(msg)
        print("✅ Email enviado com sucesso!")

except Exception as e:
    print(f"❌ Erro ao enviar email: {e}")
