from flask import Flask, render_template, jsonify
import json
import os

app = Flask(__name__)
LOG_PATH = os.path.join(os.path.dirname(__file__), '..', 'data', 'phish_log.json')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/logs')
def logs():
    try:
        with open(LOG_PATH, 'r') as f:
            data = json.load(f)
    except:
        data = []
    return jsonify(data[::-1])  # reverse = latest first

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=False)
