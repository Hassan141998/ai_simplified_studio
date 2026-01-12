#!/bin/sh
# Install dependencies
pip install -r requirements.txt

# Create database tables
python -c "from app.models import init_db; init_db()"
