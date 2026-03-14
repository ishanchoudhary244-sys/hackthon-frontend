# 🚀 DevTube AI
Search, Analyze, and Understand Programming Video Tutorials using Artificial Intelligence.

![DevTube AI Interface Banner](https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop)

DevTube AI is a modern, developer-focused platform that allows you to seamlessly search for exact programming concepts *inside* tutorial videos without manually scrubbing through hours of footage. Powered by advanced Machine Learning, the system automatically transcribes videos, generates semantic vector embeddings, and enables natural language conversational search on your local device.

---

## ✨ Features

- **Semantic Concept Search**: Stop relying on generic video chapters. Search for specific coding patterns like "Binary search complexity" or "React hooks explanation" and instantly jump to the exact timestamp where the concept is taught.
- **AI Simulator Chatbox**: Built-in RAG (Retrieval-Augmented Generation) AI assistant. Ask questions about the video you are watching, and the integrated Gemini AI will answer you based strictly on the video's context.
- **Smart Video Player**: Seamless React-hooked custom video player that automatically seeks to relevant timestamps as you click search results. 
- **Code Extraction Dashboard**: View extracted code snippets directly alongside the playing video (UI structure established).
- **Premium Developer Theme**: Fully responsive dark mode UI styled with TailwindV3, accented in vibrant developer red, featuring smooth framer-motion transitions.

---

## 🏗️ Technical Architecture

DevTube AI is split into two distinct, scalable microservices.

### The Backend (Python & FastAPI)
The brain of the platform. It handles the heavy AI lifting asynchronously:
- **`FastAPI`**: Lightning-fast async Python web framework.
- **`imageio-ffmpeg`**: Extracts raw audio streams locally from uploaded mp4s.
- **`openai-whisper`**: State-of-the-art transformer model transcribing speech to timestamped text chunks.
- **`sentence-transformers`**: Generates high-dimensional vector embeddings (`all-MiniLM-L6-v2`).
- **`FAISS`**: Facebook AI Similarity Search database storing embeddings for millisecond-fast semantic lookups.
- **`OpenRouter API`**: Connects to `google/gemini-2.5-flash-free` for intelligent chat context.

### The Frontend (React & Vite)
The blazing fast, aesthetic user interface:
- **`React Vite`**: Modern compile infrastructure for speedy hot-reloading.
- **`TailwindCSS`**: Utility-first CSS framework enforcing the dark mode design system.
- **`Lucide React`**: Crisp developer iconography.
- **`React Player`**: Wraps the HTML5 `<video>` element with programmable `seekTo` control.

---

## 🚀 Getting Started

Follow these steps to get both the frontend and backend running on your local machine.

### Prerequisites
- Python 3.10+
- Node.js & npm (v18+)

### 1. Start the Backend API

Open a new terminal window, navigate to the `backend` folder, and run:

```bash
cd backend
# Create a virtual environment (if you haven't already)
python -m venv venv

# Activate the virtual environment
# Windows:
.\venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

# Install the required Python packages
pip install -r requirements.txt

# Start the FastAPI server
uvicorn app.main:app --port 8000
```
*The API will be live at `http://localhost:8000`. You can view the interactive documentation at `http://localhost:8000/docs`.*

---

### 2. Start the Frontend Application

Open a **separate** terminal window, navigate to the `frontend` folder, and run:

```bash
cd frontend

# Install the required Node packages (only needed once)
npm install

# Start the Vite development server
npm run dev
```
*The React app will be live at `http://localhost:5173`. Open this URL in your browser.*

---

## 💡 How to Use the App

1. Ensure both your backend and frontend servers are running simultaneously.
2. Go to `http://localhost:5173`.
3. Click the **Upload Video** button in the top navigation bar and select a tutorial video (`.mp4` or `.webm`) from your computer.
4. **Wait for Processing:** You will see a red flashing banner while the backend AI transcribes and embeds the video logic.
5. Once complete, you will see the Video Dashboard.
6. **Search**: Type a concept into the "Concept Matches" search bar on the right to find specific timestamps. Click on a timestamp to jump exactly to that point in the video.
7. **Ask AI**: Use the chatbox in the bottom left to ask the OpenRouter Gemini AI nuanced questions about the tutorial's logic!

---
*Built with ❤️ for developers who value their time.*
