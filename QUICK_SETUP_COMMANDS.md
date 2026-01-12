# PythonAnywhere Setup - Quick Commands

## Step 1: Open Bash Console
1. Login to PythonAnywhere
2. Click "Consoles" tab
3. Under "Start a new console", click "Bash"

## Step 2: Run These Commands in Bash

```bash
# Clone your repository
git clone https://github.com/Hassan141998/ai_simplified_studio.git

# Navigate to backend
cd ai_simplified_studio/backend

# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database tables
python init_db.py
```

## Step 3: Note Your Username
Your PythonAnywhere username is shown in the bash prompt.
Example: `username@pythonanywhere.com:~$`
**Write down your username - you'll need it for the WSGI configuration!**

---

## Next: Create Web App

After running the commands above:

1. Go to **"Web" tab**
2. Click **"Add a new web app"**
3. Choose your subdomain (it will be: `https://YOUR_USERNAME.pythonanywhere.com`)
4. Select **"Manual configuration"**
5. Select **"Python 3.11"**
6. Click **"Next"**

I'll help you with the WSGI configuration in the next step!
