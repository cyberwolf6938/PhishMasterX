import os
import time
import pyttsx3

def speak(text, filename):
    engine = pyttsx3.init()
    engine.save_to_file(text, filename)
    engine.runAndWait()

def create_prompt():
    print("[*] Generating fake call prompts...")
    speak("This is a security alert from your bank account.", "voicebot/messages/intro.wav")
    speak("Press 1 to verify, or press 2 to cancel the alert.", "voicebot/messages/press_1_to_continue.wav")

def run_vishing():
    print("[*] Starting voice phishing module...")
    create_prompt()
    print("[+] Prompts ready. Now configure Asterisk or Twilio to call victim using these audio files.")

if __name__ == "__main__":
    run_vishing()
