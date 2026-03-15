# 🛠️ DevTube AI - Local Setup Guide

Follow this guide to get **DevTube AI** running on your local machine for development and testing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Python 3.10+** (Recommended: 3.11)
- **Node.js v18+** & **npm**
- **FFmpeg**: The backend requires FFmpeg for audio extraction.
  - *Windows*: `winget install ffmpeg`
  - *Mac*: `brew install ffmpeg`
  - *Linux*: `sudo apt install ffmpeg`

---

## 🚀 Step 1: Clone and Prepare
If you haven't already, download or clone the project folder:
```bash
# Navigate into the project root
cd hackthon-frontend
```

---

## 🧠 Step 2: Backend Setup (Python FastAPI)

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Create and Activate a Virtual Environment:**
   ```bash
   python -m venv venv
   # Windows:
   .\venv\Scripts\Activate.ps1
   # Mac/Linux:
   source venv/bin/activate
   ```

3. **Install Dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Environment Variables:**
   Create a `.env` file in the `backend/` folder (I have already created one for you with a demo key, but you should use your own for production):
   ```env
   OPENROUTER_API_KEY=your_key_here
   ```

5. **Start the Server:**
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```
   *The backend will be available at `http://localhost:8000`.*

---

## 🎨 Step 3: Frontend Setup (React Vite)

1. **Open a NEW terminal window and navigate to the frontend:**
   ```bash
   cd frontend
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run dev
   ```
   *The frontend will be live at `http://localhost:5173`.*

---

## 💡 Important Notes

### 🔑 AI Connectivity
The "Ask AI" feature requires a valid **OpenRouter API Key**. You can get one for free at [openrouter.ai](https://openrouter.ai/). Currently, it uses `google/gemini-2.5-flash-free`.

### 📂 File Uploads
Uploaded videos are stored in the `backend/data` directory. When you upload a video, the AI processing (transcription + embedding) happens locally on your machine using OpenAI Whisper and Sentence Transformers.

### ❓ Troubleshooting
- **Build Fails**: Run `npm run lint` to check for style errors.
- **Video Not Playing**: Ensure the video format is `.mp4` or `.webm`.
- **API Errors**: Check if the backend terminal shows any `ModuleNotFoundError` or `FFmpeg` errors.

---
*Developed for the Hackathon - AI-Powered Video Search*
