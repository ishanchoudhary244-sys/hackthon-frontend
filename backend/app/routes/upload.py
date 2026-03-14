import os
import uuid
import shutil
from fastapi import APIRouter, UploadFile, File, BackgroundTasks
from ..models.video_model import UploadResponse
from ..services.video_processor import process_video_pipeline

router = APIRouter()
DATA_DIR = "data"

@router.post("/upload-video", response_model=UploadResponse)
async def upload_video(background_tasks: BackgroundTasks, file: UploadFile = File(...)):
    # Generate unique video ID
    video_id = str(uuid.uuid4())[:8]
    
    # Ensure data dir exists
    os.makedirs(DATA_DIR, exist_ok=True)
    
    # Save video file
    video_path = os.path.join(DATA_DIR, f"{video_id}_{file.filename}")
    with open(video_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    # Process video synchronously so the frontend waits until embeddings are ready
    process_video_pipeline(video_id, video_path)
    
    return UploadResponse(
        video_id=video_id,
        message="Video uploaded and processing started"
    )
