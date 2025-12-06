from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv
import json

# Load environment variables from .env file in the same directory
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)

# Note: No API keys required for this version

@app.route('/api/chat', methods=['POST'])
def chat():
    # Keep chat as a stub or remove if not needed. 
    # For now, just returning a placeholder since user asked to remove AI.
    return jsonify({'response': "AI Chat is currently disabled in favor of expert rule-based advice."})

def expert_farming_logic(weather):
    """
    Deterministically generates advice based on agricultural science thresholds.
    """
    current = weather.get('current', {})
    forecast = weather.get('forecast', [])
    
    # Extract values with defaults
    temp = current.get('temp', 25)
    humidity = current.get('humidity', 50)
    wind = current.get('wind', 5)
    condition = current.get('condition', '').lower()
    
    # Check forecast for rain
    rain_forecast = any('rain' in day.get('condition', '').lower() for day in forecast)
    
    advice = {
        "irrigation": "Maintain standard irrigation schedule.",
        "protection": "Routine pest monitoring suggested.",
        "soil": "Soil conditions are stable.",
        "fertilizer": "Conditions are suitable for application."
    }

    # --- IRRIGATION LOGIC ---
    if 'rain' in condition or rain_forecast:
        advice["irrigation"] = "Rain is expected. Suspend irrigation to prevent waterlogging and conserve water."
    elif temp > 35:
        advice["irrigation"] = "High heat stress detected (>35°C). Irrigate frequently, preferably in early morning or evening."
    elif humidity < 30:
        advice["irrigation"] = "Low humidity increases evaporation. Consider light, frequent irrigation."

    # --- CROP PROTECTION LOGIC ---
    if wind > 15:
        advice["protection"] = "High winds (>15 km/h) detected. Do NOT spray pesticides (drift hazard). Secure tall crops."
    elif 'rain' in condition:
        advice["protection"] = "Humid/Rainy conditions favor fungal diseases. Monitor for blights and mildews."
    elif temp < 10:
        advice["protection"] = "Cold stress warning (<10°C). Protect sensitive seedlings from frost risk."
    elif humidity > 85 and 20 <= temp <= 30:
        advice["protection"] = "High humidity + Warm temps = High Fungal Risk (Blast/Rust). Preventive fungicide may be needed."

    # --- SOIL HEALTH LOGIC ---
    if 'rain' in condition or rain_forecast:
        advice["soil"] = "Avoid heavy machinery on wet soil to prevent compaction."
    elif temp > 40:
        advice["soil"] = "Extreme heat. Mulching is highly recommended to conserve soil moisture and reduce temperature."

    # --- FERTILIZER LOGIC ---
    if wind > 15:
        advice["fertilizer"] = "Too windy for foliar application. Wait for calm conditions."
    elif 'rain' in condition or rain_forecast:
        advice["fertilizer"] = "Do not apply fertilizer before heavy rain to prevent leaching/runoff."
    elif humidity < 40 and temp > 30:
        advice["fertilizer"] = "Avoid chemical fertilizer in dry heat to prevent leaf burn."

    return advice

@app.route('/api/farming-advisory', methods=['POST'])
def farming_advisory():
    """
    Generates expert farming recommendations using rule-based logic.
    """
    try:
        data = request.json
        weather_info = data.get('weather')
        
        if not weather_info:
             return jsonify({'error': 'No weather data provided'}), 400

        # Generate advice using pure Python logic
        advisory_json = expert_farming_logic(weather_info)
        
        return jsonify(advisory_json)

    except Exception as e:
        print(f"Advisory Error: {e}")
        return jsonify({'error': 'Failed to generate advisory', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
