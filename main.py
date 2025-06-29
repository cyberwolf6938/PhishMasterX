
from ui.cli import main_menu
import pyfiglet
import time
import os
from termcolor import cprint

def typewriter(text, delay=0.05):
    for char in text:
        print(char, end='', flush=True)
        time.sleep(delay)
    print()

def loading_bar(duration=2.5):
    bar = "["
    for i in range(20):
        time.sleep(duration / 20)
        bar += "#"
        print(f"\r{bar:<21}] Loading...", end='', flush=True)
    print("\n")

def show_banner():
    os.system("clear")  # "cls" for Windows
    typewriter("[+] Starting PhishMasterX...", 0.06)
    loading_bar()
    time.sleep(0.5)
    banner = pyfiglet.figlet_format("PhishMasterX", font="slant")
    cprint(banner, "cyan", attrs=["bold"])
    print("🔓 Created by cyberwolf | 💻 Kali Linux Toolkit\n")

if __name__ == "__main__":
    show_banner()
    main_menu()


