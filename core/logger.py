import json
from datetime import datetime
import os

def log_event(data):
    # Make sure log folder exists
    log_dir = os.path.join(os.path.dirname(__file__), '..', 'data')
    os.makedirs(log_dir, exist_ok=True)

    log_path = os.path.join(log_dir, 'phish_log.json')

    # Load old logs
    if os.path.exists(log_path):
        with open(log_path, 'r') as f:
            try:
                logs = json.load(f)
            except json.JSONDecodeError:
                logs = []
    else:
        logs = []

    # Add timestamp
    data['timestamp'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    logs.append(data)

    # Save back
    with open(log_path, 'w') as f:
        json.dump(logs, f, indent=2)

    print(f"[LOG] Event saved: {data}")

