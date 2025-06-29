import qrcode
import os
import sys
import base64  # Required for encoding

# Make sure the logger works
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from core.logger import log_event

def bypass_url_filter(url):
    """
    Ye function URL ko obfuscate aur Base64 encode karta hai.
    """
    # 1) Obfuscate by replacing http -> hxxp
    obfuscated = url.replace("http://", "hxxp://").replace("https://", "hxxps://")

    # 2) Base64 encode the original URL
    encoded = base64.b64encode(url.encode()).decode()

    return obfuscated, encoded

def generate_qr():
    """
    Ye main QR code generator + bypass function hai.
    """
    url = input("Enter phishing URL: ").strip()
    bypass = input("Enable URL Filter Bypass? (y/n): ").strip().lower()

    if bypass == "y":
        obf_url, encoded_url = bypass_url_filter(url)
        print(f"\n[+] Obfuscated URL: {obf_url}")
        print(f"[+] Base64 Encoded URL: {encoded_url}")

        print("\n[1] Use Obfuscated URL in QR")
        print("[2] Use Base64 Encoded URL in QR (victim must decode or use redirect)")
        bypass_choice = input("Select (1/2): ").strip()

        if bypass_choice == "1":
            final_url = obf_url
        elif bypass_choice == "2":
            final_url = encoded_url
        else:
            print("[-] Invalid choice, using obfuscated URL by default.")
            final_url = obf_url

    else:
        final_url = url

    # Generate QR Code
    img = qrcode.make(final_url)

    # Create safe filename
    safe_url = final_url.replace("https://", "").replace("http://", "").replace("/", "_")
    os.makedirs("data/qrcodes", exist_ok=True)
    file_path = f"data/qrcodes/{safe_url}.png"

    img.save(file_path)
    print(f"\n[+] QR Code saved to: {file_path}")

    # Log the event
    log_event({
        "module": "QR-Phish",
        "event": "QR code generated",
        "target_url": final_url
    })

