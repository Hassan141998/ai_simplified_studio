# 🚀 Render Free Tier Deployment - Step by Step

## Backend Deployment to Render

### Step 1: Sign Up / Sign In
1. Go to: https://render.com
2. Click **"Get Started for Free"**
3. Sign up with **GitHub** (easiest)
4. Authorize Render to access your GitHub repos

### Step 2: Create New Web Service
1. Click **"New +"** button (top right)
2. Select **"Web Service"**
3. Click **"Connect account"** if needed to link GitHub
4. Find and select: **`Hassan141998/ai_simplified_studio`**
5. Click **"Connect"**

### Step 3: Configure Service

**Basic Settings:**
```
Name: ai-simplified-studio-api
Region: Oregon (US West) or Frankfurt (Europe) - pick closest
Branch: main
Root Directory: backend
```

**Build & Deploy:**
```
Runtime: Python 3
Build Command: pip install -r requirements.txt
Start Command: uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

**Instance Type:**
```
⚠️ IMPORTANT: Select "Free" (not Starter $7/month)
```

### Step 4: Environment Variables

Click **"Advanced"** → **"Add Environment Variable"**

Add these THREE variables:

1. **DATABASE_URL**
   ```
   postgresql://postgres.zgfuyimbfnyptosvkkrt:796096@1q2w3e4r5t6Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   ```

2. **PYTHON_VERSION**
   ```
   3.11
   ```

3. **FRONTEND_URL**
   ```
   http://localhost:5173
   ```
   (We'll update this after deploying the frontend)

### Step 5: Create Web Service
1. Scroll down
2. Click **"Create Web Service"**
3. Wait 3-5 minutes for deployment

### Step 6: Verify Deployment

Once deployed, you'll get a URL like:
```
https://ai-simplified-studio-api.onrender.com
```

Test it:
1. Visit: `https://your-url.onrender.com/docs`
2. Should see FastAPI Swagger docs
3. Try GET `/api/projects/` - should return `[]`

---

## Frontend Deployment to Vercel

### Step 1: Sign Up / Sign In
1. Go to: https://vercel.com
2. Sign up with **GitHub**
3. Authorize Vercel

### Step 2: Import Project
1. Click **"Add New..."** → **"Project"**
2. Click **"Import"** next to `ai_simplified_studio`
3. Configure import settings:
   ```
   Framework Preset: Vite
   Root Directory: frontend
   Build Command: npm run build (auto-detected)
   Output Directory: dist (auto-detected)
   Install Command: npm install (auto-detected)
   ```

### Step 3: Environment Variables

Click **"Environment Variables"** and add:

**VITE_API_URL**
```
https://ai-simplified-studio-api.onrender.com/api
```
(Replace with YOUR Render backend URL + `/api`)

### Step 4: Deploy
1. Click **"Deploy"**
2. Wait 2-3 minutes
3. You'll get a URL like: `https://ai-simplified-studio.vercel.app`

### Step 5: Update Backend CORS

Go back to Render dashboard:
1. Find your backend service
2. Go to **"Environment"**
3. Edit **FRONTEND_URL** to:
   ```
   https://ai-simplified-studio.vercel.app
   ```
   (Use YOUR Vercel URL)
4. Service will auto-redeploy

---

## ✅ Final Testing

1. Visit your Vercel frontend URL
2. Create a new project
3. Enter a script
4. Click Generate Video
5. Wait for completion
6. Download should work!

**Note**: First request may be slow (15-30 sec) because Render free tier "wakes up" from sleep.

---

## 📝 Important Notes

**Render Free Tier Limitations:**
- ✅ 750 hours/month (enough for 1 app 24/7)
- ⚠️ Sleeps after 15 min of inactivity
- ⚠️ Cold start takes 15-30 seconds on first request
- ✅ Automatic HTTPS
- ✅ Auto-deploys from GitHub

**Vercel Free Tier:**
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Instant deploys
- ✅ Global CDN

**Both are completely FREE - no credit card required!**
