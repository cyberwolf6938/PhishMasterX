import requests
from bs4 import BeautifulSoup
import re
import os

def analyze_html():
    choice = input("🔎 Enter [1] for Local HTML file or [2] for URL: ")

    if choice == "1":
        file_path = input("📂 Enter path to HTML file: ")
        try:
            with open(file_path, "r", encoding="utf-8") as f:
                content = f.read()
        except Exception as e:
            print(f"[-] File Error: {e}")
            return

    elif choice == "2":
        url = input("🌐 Enter URL to scan: ")
        try:
            response = requests.get(url)
            content = response.text
        except Exception as e:
            print(f"[-] URL Error: {e}")
            return
    else:
        print("❌ Invalid choice")
        return

    # ➜ Local static checks
    soup = BeautifulSoup(content, "html.parser")
    warnings = []

    if soup.find("input", {"type": "password"}):
        warnings.append("🔑 Password field detected.")

    if re.search(r"http[s]?://[^ ]*(\.xyz|\.tk|\.ru|\.ml)", content):
        warnings.append("⚠ Suspicious domain found.")

    if soup.find_all("script", src=True):
        warnings.append("📜 External JS scripts found.")

    if soup.find_all("input", {"type": "hidden"}):
        warnings.append("👀 Hidden fields found.")

    forms = soup.find_all("form")
    for form in forms:
        if form.get("action") and ("http" in form.get("action")):
            warnings.append(f"📤 Form action going to: {form.get('action')}")

    # ➜ VirusTotal
    api_key = input("🔑 Enter your VirusTotal API Key: ")
    vt_url = "https://www.virustotal.com/api/v3/urls"
    headers = {"x-apikey": api_key}

    if choice == "2":
        data = {"url": url}
    else:
        # Local file — we simulate with dummy URL or skip
        data = {"url": "http://test.local"}

    try:
        response = requests.post(vt_url, headers=headers, data=data)
        if response.status_code == 200:
            scan_id = response.json()['data']['id']
            report_url = f"https://www.virustotal.com/api/v3/analyses/{scan_id}"

            print("🔄 Checking VirusTotal report...")
            report = requests.get(report_url, headers=headers).json()
            print(f"🧾 VirusTotal raw result: {report}")
        else:
            print(f"❌ VirusTotal Error: {response.status_code} - {response.text}")
    except Exception as e:
        print(f"❌ VirusTotal Exception: {e}")

    # ➜ Final local result
    print("\n📊 Local Analysis Report:")
    if warnings:
        for w in warnings:
            print(f"⚠ {w}")
        print("🔴 This page **may** be phishing.")
    else:
        print("✅ Local check: This page looks clean.")


