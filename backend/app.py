import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables
dotenv_path = os.path.join(os.path.dirname(__file__), '.env')
load_dotenv(dotenv_path)

app = Flask(__name__)
CORS(app)

# Configure Gemini API
GENAI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GENAI_API_KEY:
    print("Warning: GEMINI_API_KEY not found in environment variables.")
else:
    genai.configure(api_key=GENAI_API_KEY)

# System Prompt for Indian Farmer Persona
SYSTEM_PROMPT = """
You are AI-Agri Advisor, an expert agricultural consultant for Indian farmers. 
Your goal is to provide practical, region-specific, and actionable advice to help farmers improve their crop yield and sustainability.

Key traits:
1.  **Language**: Respond in a simple, respectful, and encouraging tone. If the user asks in a specific Indian language (detected from text or specified), try to respond in that language or simple English if not possible.
2.  **Context**: Consider Indian seasons (Kharif, Rabi, Zaid), common Indian crops (Rice, Wheat, Cotton, Sugarcane, Pulses), and local climate conditions.
3.  **Topics**:
    *   **Crop Health**: Diagnose diseases from descriptions or images and suggest remedies (organic preferred, then chemical).
    *   **Weather**: Explain weather impacts on crops.
    *   **Schemes**: Mention relevant Indian government schemes (PM-KISAN, Fasal Bima Yojana, etc.).
    *   **Fertilizers**: Recommend NPK ratios and organic alternatives like Jeevamrutha.
4.  **Formatting**: Use bullet points for steps. bold key terms.

If you don't know the answer, admit it and suggest consulting a local Krishi Vigyan Kendra (KVK).
"""

model = genai.GenerativeModel('gemini-2.0-flash', system_instruction=SYSTEM_PROMPT)

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_message = data.get('message')
        user_image = data.get('image') # Base64 string if present
        language = data.get('language', 'English') # Preferred language

        if not user_message and not user_image:
            return jsonify({'error': 'No content provided'}), 400

        # Construct the conversation history (simplified for now, strictly per-request)
        # In a real app, we'd manage history. Here we just send the current turn with system context.
        
        prompt_parts = []
        
        # Add context about language if needed
        if language and language != 'English':
             prompt_parts.append(f"Please respond in {language} language.")

        if user_message:
            prompt_parts.append(user_message)
        
        if user_image:
            # We assume image is sent as a base64 data URI: "data:image/jpeg;base64,..."
            # We need to parse it for Gemini
            try:
                # Basic parsing "data:image/jpeg;base64,..."
                header, base64_data = user_image.split(',', 1)
                mime_type = header.split(':')[1].split(';')[0]
                
                image_blob = {
                    'mime_type': mime_type,
                    'data': base64_data
                }
                prompt_parts.append(image_blob)
            except Exception as e:
                print(f"Error parsing image: {e}")
                return jsonify({'error': 'Invalid image format'}), 400

        # Generate response
        response = model.generate_content(prompt_parts)
        
        return jsonify({'response': response.text})

    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({'error': 'AI processing failed', 'details': str(e)}), 500

if __name__ == '__main__':
    app.run(port=5000, debug=True)
