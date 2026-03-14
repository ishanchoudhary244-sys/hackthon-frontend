import ffmpeg
import whisper
import os
import imageio_ffmpeg

model = whisper.load_model("base")

def extract_audio(video_path: str, audio_path: str):
    """Extracts audio from video using FFmpeg."""
    ffmpeg_exe = imageio_ffmpeg.get_ffmpeg_exe()
    try:
        (
            ffmpeg
            .input(video_path)
            .output(audio_path, acodec='pcm_s16le', ac=1, ar='16k')
            .overwrite_output()
            .run(cmd=ffmpeg_exe, quiet=True)
        )
    except ffmpeg.Error as e:
        print(f"FFmpeg error: {e}")
        raise e

def transcribe_audio(audio_path: str):
    """Transcribes audio using OpenAI Whisper."""
    result = model.transcribe(audio_path)
    
    chunks = []
    for segment in result['segments']:
        chunks.append({
            "text": segment['text'].strip(),
            "start_time": segment['start'],
            "end_time": segment['end']
        })
        
    return chunks
