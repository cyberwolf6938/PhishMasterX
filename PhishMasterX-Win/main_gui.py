import tkinter as tk
from tkinter import messagebox
import subprocess
import os

def run_module(module_path):
    try:
        subprocess.Popen(["python", module_path])
    except Exception as e:
        messagebox.showerror("Module Error", str(e))

app = tk.Tk()
app.title("PhishMasterX GUI")
app.geometry("400x320")
app.configure(bg="#111")

tk.Label(app, text="🎣 PhishMasterX GUI", fg="cyan", bg="#111", font=("Arial", 18)).pack(pady=10)

modules = {
    "QR Phish": "qrphish/redirect_server.py",
    "Email Phisher++": "email/send_email.py",
    "Click Tracker": "email/click_tracker.py",
    "Live Dashboard": "dashboard/app.py"
}

for label, script in modules.items():
    tk.Button(app, text=label, command=lambda s=script: run_module(s), width=30, bg="#222", fg="white").pack(pady=5)

app.mainloop()
