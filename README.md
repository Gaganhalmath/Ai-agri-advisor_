# AI Agri Advisor

## Project Setup

### Backend (Python/Flask)

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Install dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Configure Environment Variables:**
    - Create a `.env` file in the `backend` directory.
    - Add your OpenAI API key:
      ```
      OPENAI_API_KEY=your_api_key_here
      ```

4.  **Run the Backend Server:**
    ```bash
    python app.py
    ```
    The server will start at `http://localhost:5000`.

### Frontend (React/Vite)

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the Development Server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.
