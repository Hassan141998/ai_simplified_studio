from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas
from .models import get_db
from .services.generator import generate_project_assets
import os
from fastapi.responses import FileResponse
import zipfile

router = APIRouter()

@router.post("/projects/", response_model=schemas.Project)
def create_project(project: schemas.ProjectCreate, db: Session = Depends(get_db)):
    db_project = models.Project(title=project.title, script_text=project.script_text)
    db.add(db_project)
    db.commit()
    db.refresh(db_project)
    return db_project

@router.get("/projects/", response_model=List[schemas.Project])
def read_projects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    projects = db.query(models.Project).offset(skip).limit(limit).all()
    return projects

@router.get("/projects/{project_id}", response_model=schemas.Project)
def read_project(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if project is None:
        raise HTTPException(status_code=404, detail="Project not found")
    return project

@router.post("/projects/{project_id}/generate")
def generate_project(project_id: int, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    project.status = "queued"
    db.commit()
    
    background_tasks.add_task(generate_project_assets, project_id)
    return {"message": "Generation started", "status": "queued"}

@router.put("/projects/{project_id}", response_model=schemas.Project)
def update_project(project_id: int, project_update: schemas.ProjectUpdate, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    if project_update.title is not None:
        project.title = project_update.title
    if project_update.script_text is not None:
        project.script_text = project_update.script_text
    
    db.commit()
    db.refresh(project)
    return project

@router.get("/projects/{project_id}/download")
def download_project_assets(project_id: int, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    
    # Create ZIP
    if not os.path.exists("temp"):
        os.makedirs("temp")
    
    zip_filename = f"temp/project_{project_id}.zip"
    
    with zipfile.ZipFile(zip_filename, 'w') as zipf:
        for asset in project.assets:
            if os.path.exists(asset.file_path):
                zipf.write(asset.file_path, arcname=os.path.basename(asset.file_path))
                
    return FileResponse(zip_filename, media_type='application/zip', filename=f"project_{project_id}.zip")
