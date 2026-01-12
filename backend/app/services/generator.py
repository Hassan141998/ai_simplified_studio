import asyncio
import os
import time
from ..models import SessionLocal, Project, Asset
from sqlalchemy.orm import Session

# Simulate delays
TTS_DELAY = 3
VIDEO_RENDER_DELAY = 5

def ensure_storage():
    os.makedirs("storage", exist_ok=True)

async def simulate_tts_generation(text: str, project_id: int):
    """Simulates generating an audio file from text."""
    ensure_storage()
    await asyncio.sleep(TTS_DELAY)
    
    filename = f"project_{project_id}_audio.wav"
    filepath = os.path.join("storage", filename)
    
    # Create a dummy WAV file (just empty bytes or text for simulation)
    with open(filepath, "wb") as f:
        f.write(b"RIFF....WAVEfmt ....data....") # Fake header
        
    return filepath

async def simulate_video_generation(audio_path: str, project_id: int):
    """Simulates rendering a video file."""
    ensure_storage()
    await asyncio.sleep(VIDEO_RENDER_DELAY)
    
    filename = f"project_{project_id}_output.mp4"
    filepath = os.path.join("storage", filename)
    
    # Create a dummy MP4 file
    with open(filepath, "wb") as f:
        f.write(b"....ftypisom....") # Fake MP4 header
        
    return filepath

async def generate_project_assets(project_id: int):
    """Background task to generate all assets."""
    db = SessionLocal()
    try:
        project = db.query(Project).filter(Project.id == project_id).first()
        if not project:
            return
        
        project.status = "generating_audio"
        db.commit()
        
        # 1. Generate Audio
        audio_path = await simulate_tts_generation(project.script_text, project_id)
        audio_asset = Asset(project_id=project_id, asset_type="audio", file_path=audio_path)
        db.add(audio_asset)
        db.commit()
        
        project.status = "rendering_video"
        db.commit()
        
        # 2. Generate Video
        video_path = await simulate_video_generation(audio_path, project_id)
        video_asset = Asset(project_id=project_id, asset_type="video", file_path=video_path)
        db.add(video_asset)
        
        # 3. Generate Thumbnail (instant)
        thumb_path = os.path.join("storage", f"project_{project_id}_thumb.jpg")
        with open(thumb_path, "wb") as f:
            f.write(b"....fakeimage....")
        thumb_asset = Asset(project_id=project_id, asset_type="thumbnail", file_path=thumb_path)
        db.add(thumb_asset)

        project.status = "completed"
        db.commit()
        
    except Exception as e:
        print(f"Generation failed: {e}")
        project.status = "failed"
        db.commit()
    finally:
        db.close()
