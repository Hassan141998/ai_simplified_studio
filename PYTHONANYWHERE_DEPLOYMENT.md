# 🚀 PythonAnywhere Deployment Guide (FREE - No Credit Card)

## ✅ Why PythonAnywhere?
- ✅ **Completely FREE** - No credit card required
- ✅ **Always-on** - Doesn't sleep like Render free tier
- ✅ **Python-friendly** - Perfect for FastAPI
- ✅ **Easy setup** - Web-based console

---

## 📋 Step-by-Step Deployment

### Step 1: Create PythonAnywhere Account

1. Go to: **https://www.pythonanywhere.com**
2. Click **"Start running Python online in less than a minute!"**
3. Click **"Create a Beginner account"** (FREE)
4. Fill in:
   - Username: (choose your username - remember this!)
   - Email: your email
   - Password: create a password
5. Click **"Register"**
6. Verify your email

### Step 2: Open Bash Console

1. After logging in, click **"Consoles"** tab
2. Click **"Bash"** under "Start a new console"
3. A terminal will open in your browser

### Step 3: Clone Your Repository

In the Bash console, run these commands:

```bash
# Clone your repository
git clone https://github.com/Hassan141998/ai_simplified_studio.git

# Navigate to backend directory
cd ai_simplified_studio/backend

# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python init_db.py
```

### Step 4: Create Web App

1. Go to **"Web"** tab (top navigation)
2. Click **"Add a new web app"**
3. Choose your subdomain:
   - You'll get: `https://YOUR_USERNAME.pythonanywhere.com`
   - Click **"Next"**
4. Select **"Manual configuration"**
5. Select **"Python 3.11"**
6. Click **"Next"**

### Step 5: Configure WSGI File

1. On the Web tab, find **"Code"** section
2. Click on the WSGI configuration file link (something like `/var/www/username_pythonanywhere_com_wsgi.py`)
3. **Delete all existing content**
4. **Copy and paste this** (replace `YOUR_USERNAME` with your actual username):

```python
import sys
import os

# Add your project directory to the sys.path
project_home = '/home/YOUR_USERNAME/ai_simplified_studio/backend'
if project_home not in sys.path:
    sys.path.insert(0, project_home)

# Set environment variables
os.environ['DATABASE_URL'] = 'postgresql://postgres.zgfuyimbfnyptosvkkrt:796096@1q2w3e4r5t6Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres'
os.environ['FRONTEND_URL'] = 'http://localhost:5173'

# Import your FastAPI app
from app.main import app as application
```

5. Click **"Save"** (top right)

### Step 6: Configure Virtualenv

1. Still on the Web tab, scroll to **"Virtualenv"** section
2. Enter the path to your virtual environment:
   ```
   /home/YOUR_USERNAME/ai_simplified_studio/backend/venv
   ```
3. Press Enter

### Step 7: Reload Web App

1. Scroll to the top of the Web tab
2. Click the green **"Reload"** button
3. Wait a few seconds

### Step 8: Test Your Backend

1. Click the link to your site: `https://YOUR_USERNAME.pythonanywhere.com`
2. Add `/docs` to the URL: `https://YOUR_USERNAME.pythonanywhere.com/docs`
3. You should see the FastAPI Swagger documentation!
4. Test `/api/projects/` endpoint - should return `[]`

---

## 🎨 Deploy Frontend to Vercel (Still FREE, No Card)

### Step 1: Sign Up for Vercel

1. Go to: **https://vercel.com**
2. Click **"Sign Up"**
3. Choose **"Continue with GitHub"**
4. Authorize Vercel to access your repos

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Find `ai_simplified_studio` and click **"Import"**
3. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend` ← Click "Edit" to set this
   - **Build Command**: (auto-detected)
   - **Output Directory**: `dist` (auto-detected)

### Step 3: Add Environment Variable

1. Expand **"Environment Variables"**
2. Add variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://YOUR_USERNAME.pythonanywhere.com/api`
   - (Replace YOUR_USERNAME with your PythonAnywhere username)
3. Click **"Add"**

### Step 4: Deploy

1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://ai-simplified-studio.vercel.app`

### Step 5: Update Backend CORS

1. Go back to PythonAnywhere
2. Click **"Web"** tab
3. Click on your WSGI configuration file
4. Find the line: `os.environ['FRONTEND_URL'] = 'http://localhost:5173'`
5. Change it to your Vercel URL:
   ```python
   os.environ['FRONTEND_URL'] = 'https://ai-simplified-studio.vercel.app'
   ```
6. Click **"Save"**
7. Click **"Reload"** button (top of Web tab)

---

## ✅ Final Testing

1. Visit your Vercel frontend: `https://ai-simplified-studio.vercel.app`
2. Click "New Project"
3. Enter a script
4. Click "Generate Video"
5. Watch the status updates
6. Download should work!

---

## 📝 Important Notes

**PythonAnywhere Free Tier:**
- ✅ One web app
- ✅ Always running (no sleep!)
- ✅ 512 MB disk space
- ✅ HTTPS included
- ✅ **No credit card needed**
- ⚠️ Limited CPU time per day (enough for testing/demos)

**Vercel Free Tier:**
- ✅ Unlimited projects
- ✅ 100 GB bandwidth/month
- ✅ Global CDN
- ✅ **No credit card needed**

---

## 🔧 Troubleshooting

**If you see errors:**

1. **Check console logs**:
   - PythonAnywhere → Web tab → Log files → Error log
   
2. **Common issues**:
   - Wrong virtualenv path → Double-check path
   - Import errors → Make sure all dependencies installed
   - Database connection → Check DATABASE_URL is correct

3. **Need to update code?**
   ```bash
   cd ~/ai_simplified_studio
   git pull
   # Then click Reload on Web tab
   ```

---

## 🎉 You're Live!

Both your backend and frontend are now deployed **completely FREE** with no credit card required!

- **Backend**: `https://YOUR_USERNAME.pythonanywhere.com`
- **Frontend**: `https://ai-simplified-studio.vercel.app`
- **API Docs**: `https://YOUR_USERNAME.pythonanywhere.com/docs`

Need help? Let me know! 🚀
