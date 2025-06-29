from gtts import gTTS
import os

def generate_ai_voice(text, filename):
    tts = gTTS(text=text, lang='en')  # ← 'ur' for Urdu, 'en' for English
    save_path = f"voicebot/prompts/{filename}.mp3"
    tts.save(save_path)
    print(f"[+] Saved AI voice to {save_path}")

if __name__ == "__main__":
    print("🎙️ AI Voice Prompt Generator")
    text = input("Enter message to convert to voice: ")
    filename = input("Save as filename (without extension): ")
    generate_ai_voice(text, filename)
