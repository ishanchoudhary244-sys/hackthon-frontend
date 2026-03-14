import os
import json
from .transcription import extract_audio, transcribe_audio
from .embeddings import generate_embeddings_batch
from .vector_store import get_store

DATA_DIR = "data"

def process_video_pipeline(video_id: str, video_path: str):
    """"""
    try:
        print(f"[{video_id}] Starting video processing pipeline.")
        audio_path = os.path.join(DATA_DIR, f"{video_id}.wav")
        
        # 1. Extract audio
        print(f"[{video_id}] Extracting audio...")
        extract_audio(video_path, audio_path)
        
        # 2. Transcribe
        print(f"[{video_id}] Transcribing audio with Whisper...")
        chunks = transcribe_audio(audio_path)
        
        # Save transcript to JSON for reference
        transcript_path = os.path.join(DATA_DIR, f"{video_id}_transcript.json")
        with open(transcript_path, 'w') as f:
            json.dump(chunks, f, indent=2)
            
        # 3. Embed and Index
        if chunks:
            print(f"[{video_id}] Generating embeddings...")
            texts = [chunk['text'] for chunk in chunks]
            embeddings = generate_embeddings_batch(texts)
            
            print(f"[{video_id}] Storing in vector database...")
            store = get_store(video_id)
            store.add_texts(embeddings, chunks)
            
        print(f"[{video_id}] Pipeline completed successfully.")
        
        # Clean up audio file
        if os.path.exists(audio_path):
            os.remove(audio_path)
            
    except Exception as e:
        print(f"[{video_id}] Error in pipeline: {str(e)}")
