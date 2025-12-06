from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file in the same directory
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)

# Load your API key from environment variable
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
print(f"API Key loaded: {bool(OPENAI_API_KEY)}")  # Debug: Check if key is loaded

@app.route('/api/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    if not user_message:
        return jsonify({'error': 'No message provided'}), 400

    headers = {
        "Authorization": f"Bearer {OPENAI_API_KEY}",
        "Content-Type": "application/json"
    }
    data = {
        "model": "gpt-4o-mini",  # Updated to valid model name
        "messages": [{"role": "user", "content": user_message}]
    }

    response = requests.post("https://api.openai.com/v1/chat/completions", headers=headers, json=data)
    print(response.status_code, response.text)  # Debugging output

    if response.status_code == 200:
        result = response.json()
        return jsonify({'response': result['choices'][0]['message']['content']})
    else:
        return jsonify({'error': 'OpenAI API error', 'details': response.text}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
