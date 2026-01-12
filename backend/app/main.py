import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from .api import router
from .models import init_db
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="AI Simplified Studio API")

# CORS
frontend_url = os.getenv("FRONTEND_URL", "http://localhost:5173")
origins = [
    frontend_url,
    "http://localhost:5173",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize DB
@app.on_event("startup")
async def startup_event():
    init_db()

# Include Metadata/API Router
app.include_router(router, prefix="/api")

# Mount static files for generated media (simulated storage)
os.makedirs("storage", exist_ok=True)
app.mount("/storage", StaticFiles(directory="storage"), name="storage")

@app.get("/")
def read_root():
    return {"message": "AI Simplified Studio API is running"}
