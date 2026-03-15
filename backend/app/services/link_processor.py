import yt_dlp
import os
import uuid

DATA_DIR = "data"

def download_audio_from_link(url: str) -> tuple[str, str]:
    """
    Downloads the audio stream from a video URL (YouTube, etc.) 
    and returns a tuple of (video_id, audio_path).
    """
    video_id = str(uuid.uuid4())[:8]
    os.makedirs(DATA_DIR, exist_ok=True)
    
    audio_path_template = os.path.join(DATA_DIR, f"{video_id}.%(ext)s")
    
    ydl_opts = {
        'format': 'bestaudio/best',
        'postprocessors': [{
            'key': 'FFmpegExtractAudio',
            'preferredcodec': 'wav',
            'preferredquality': '192',
        }],
        'outtmpl': audio_path_template,
        'quiet': True,
        'no_warnings': True,
    }
    
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        info = ydl.extract_info(url, download=True)
        # yt-dlp might change the extension to .wav due to postprocessor
        audio_path = os.path.join(DATA_DIR, f"{video_id}.wav")
        
    return video_id, audio_path
