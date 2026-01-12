from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AssetBase(BaseModel):
    asset_type: str
    file_path: str

class Asset(AssetBase):
    id: int
    created_at: datetime
    class Config:
        orm_mode = True

class ProjectBase(BaseModel):
    title: str
    script_text: Optional[str] = ""

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    script_text: Optional[str] = None
    status: Optional[str] = None

class Project(ProjectBase):
    id: int
    status: str
    created_at: datetime
    assets: List[Asset] = []
    class Config:
        orm_mode = True
