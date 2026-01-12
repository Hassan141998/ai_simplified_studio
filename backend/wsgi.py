"""
WSGI configuration for PythonAnywhere deployment
"""
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/YOUR_USERNAME/ai_simplified_studio/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['DATABASE_URL'] = 'postgresql://postgres.zgfuyimbfnyptosvkkrt:796096@1q2w3e4r5t6Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
os.environ['FRONTEND_URL'] = 'http://localhost:5173'  # Update after deploying frontend

# Import your FastAPI app
from app.main import app as asgi_app
from a2wsgi import ASGIMiddleware

# Wrap the ASGI app as a WSGI app (ASGI to WSGI)
application = ASGIMiddleware(asgi_app)
