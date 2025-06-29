# 📡 PhishMasterX - Advanced Phishing Toolkit

🔓 **Created by cyberwolf | 💻 Kali Linux Toolkit**

---

## 🚀 Features

✅ Website Cloner + Logger  
✅ QR Code Phishing Generator  
✅ Email Phishing Sender  
✅ HTML Analyzer for Phishing Detection  
✅ BitB (Browser-in-the-Browser) Phishing Pages  
✅ Data URI Phishing Link Creator  
✅ Wi-Fi Captive Portal Fake Login Page  
✅ Voice Phishing Bot (Vishing)  
✅ Real-time Logging with LiveMonitorX (optional)

---

## 📂 Directory Structure

PhishMasterX/
├── core/ # Main modules
├── ui/ # CLI & GUI
├── captive/ # Wi-Fi fake portal
├── voicebot/ # Vishing bot files
├── templates/ # HTML templates for phishing pages
├── static/ # Static assets (images, css)
├── data/ # Logs & generated QR codes
├── cli.py # Command-line launcher
├── main.py # Entry point
├── requirements.txt
└── README.md


---

## ⚙️ Installation

```bash
git clone https://github.com/YOUR_USERNAME/PhishMasterX.git
cd PhishMasterX
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 main.py
 
🟢 LiveMonitorX Setup:
✅ LiveMonitorX se real-time logs dekho:
   python3 dashboard/livemonitor.py run karo
   Browser mein http://localhost:8000 open karo
   Sab phishing logs yahin dikhenge
