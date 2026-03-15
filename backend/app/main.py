from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

load_dotenv()

from .routes import upload, search, ask_ai, video_link

app = FastAPI(title="DevTube AI API", description="Backend for processing and searching programming videos.")

# Allow CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5174", "http://localhost:5175"], # Explicit origins for development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize data directory
os.makedirs("data", exist_ok=True)

# Include routers
app.include_router(upload.router, tags=["Upload"])
app.include_router(search.router, tags=["Search"])
app.include_router(ask_ai.router, tags=["AI"])
app.include_router(video_link.router, tags=["Link"])

@app.get("/")
def health_check():
    return {"status": "ok", "message": "DevTube AI Backend is running"}
