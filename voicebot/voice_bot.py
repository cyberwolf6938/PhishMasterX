import pyttsx3
import os

def vishing_bot():
    print("\n🎙️ Voice Phishing Bot (Vishing)\n")
    message = input("🔹 Enter phishing message to convert to voice: ").strip()

    # Initialize text-to-speech engine
    engine = pyttsx3.init()

    # Set properties if needed (voice, rate, volume)
    engine.setProperty('rate', 150)  # speed of speech
    engine.setProperty('volume', 1)  # max volume

    # Save audio to file
    output_file = "vishing_message.mp3"
    engine.save_to_file(message, output_file)
    engine.runAndWait()

    print(f"[+] Voice file saved: {output_file}")

    # Play audio
    print("[*] Playing the audio now...")
    if os.name == 'posix':  # Linux or Mac
        os.system(f"mpg123 {output_file} || afplay {output_file} || vlc {output_file}")
    elif os.name == 'nt':   # Windows
        os.system(f"start {output_file}")
    else:
        print("[!] Could not auto-play. Please play manually:", output_file)

    print("[✅] Voice Phishing Bot executed successfully.\n")
