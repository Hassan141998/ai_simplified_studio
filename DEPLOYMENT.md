# AI Simplified Studio - Deployment Guide

## 🎯 Deployment Overview

This guide will walk you through deploying AI Simplified Studio to production with:
- **Backend**: Railway or Render (FastAPI + PostgreSQL)
- **Frontend**: Vercel (React + Vite)
- **Database**: Supabase PostgreSQL

## ✅ Prerequisites

- [x] GitHub repository: https://github.com/Hassan141998/ai_simplified_studio  
- [x] Supabase database configured
- [x] Database tables created (`projects`, `assets`)

## 🗄️ Database Setup (Completed)

Your Supabase PostgreSQL database is already configured:
- **Project**: `zgfuyimbfnyptosvkkrt`
- **Connection**: Pooler (Port 6543)
- **Tables**: ✅ Created and ready

## 🚀 Backend Deployment

### Option 1: Railway (Recommended)

1. **Go to Railway**: https://railway.app
2. **Sign in** with GitHub
3. **New Project** → **Deploy from GitHub repo**
4. **Select**: `Hassan141998/ai_simplified_studio`
5. **Set Root Directory**: `backend`
6. **Add Environment Variables**:
   ```
   DATABASE_URL=postgresql://postgres.zgfuyimbfnyptosvkkrt:796096@1q2w3e4r5t6Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   PORT=8000
   FRONTEND_URL=<your-vercel-url>
   ```
7. **Deploy Settings**:
   - Build Command: (leave empty, uses requirements.txt automatically)
   - Start Command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
8. **Deploy** → Railway will auto-deploy

### Option 2: Render

1. **Go to Render**: https://render.com
2. **New** → **Web Service**
3. **Connect GitHub**: `Hassan141998/ai_simplified_studio`
4. **Configuration**:
   - **Name**: `ai-simplified-studio-api`
   - **Root Directory**: `backend`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt && python init_db.py`
   - **Start Command**: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
5. **Environment Variables**:
   ```
   DATABASE_URL=postgresql://postgres.zgfuyimbfnyptosvkkrt:796096@1q2w3e4r5t6Y@aws-0-us-east-1.pooler.supabase.com:6543/postgres
   PYTHON_VERSION=3.11
   FRONTEND_URL=<your-vercel-url>
   ```
6. **Create Web Service**

**Your backend URL will be something like**:
- Railway: `https://ai-simplified-studio-backend.railway.app`
- Render: `https://ai-simplified-studio-api.onrender.com`

## 🎨 Frontend Deployment (Vercel)

1. **Go to Vercel**: https://vercel.com
2. **Import Project** → **Import Git Repository**
3. **Select**: `Hassan141998/ai_simplified_studio`
4. **Framework Preset**: Vite
5. **Root Directory**: `frontend`
6. **Environment Variables**:
   ```
   VITE_API_URL=<your-backend-url>/api
   ```
   Example: `https://ai-simplified-studio-backend.railway.app/api`
7. **Deploy**

**Your frontend URL will be**:
`https://ai-simplified-studio.vercel.app` (or similar)

## 🔄 Update CORS

After deploying both frontend and backend:

1. **Update Backend Environment Variable** on Railway/Render:
   ```
   FRONTEND_URL=https://ai-simplified-studio.vercel.app
   ```
2. **Redeploy** the backend service

## ✅ Verification Steps

1. **Test Backend API**:
   - Visit: `https://your-backend-url/docs`
   - Should see FastAPI Swagger documentation
   - Test endpoints (GET /api/projects should return `[]`)

2. **Test Frontend**:
   - Visit: `https://your-frontend-url`
   - Should see AI Simplified branding
   - Try creating a new project
   - Test video generation workflow

3. **Test Full Integration**:
   - Create project → Enter script → Generate video
   - Verify status updates work
   - Confirm download button appears

## 🛠️ Troubleshooting

### Backend Issues

**Database Connection Errors**:
- Verify `DATABASE_URL` is correct
- Check Supabase is active
- Ensure IP restrictions are off (or whitelist 0.0.0.0/0)

**CORS Errors**:
- Make sure `FRONTEND_URL` matches your Vercel domain exactly
- Redeploy backend after changing environment variables

**Module Import Errors**:
- Verify all dependencies in `requirements.txt`
- Check Python version is 3.11+

### Frontend Issues

**API Connection Failed**:
- Check `VITE_API_URL` is set correctly with `/api` suffix
- Verify backend is deployed and accessible
- Check browser console for CORS errors

**Build Failures**:
- Ensure all npm dependencies are installed
- Check Tailwind CSS configuration
- Verify TypeScript compilation

## 📊 Monitoring

### Railway
- Built-in logs and metrics dashboard
- Auto-scaling available

### Render
- Logs available in dashboard
- Free tier sleeps after inactivity (use cron job to keep awake)

### Vercel
- Analytics built-in
- Edge network CDN
- Automatic HTTPS

## 💰 Cost Estimate

### Free Tier Limits:
- **Railway**: $5 free credits/month (should be enough for testing)
- **Render**: Free tier with sleep after 15 min inactivity
- **Vercel**: 100 GB bandwidth free
- **Supabase**: 500 MB database, 2 GB bandwidth free

**Recommended for Production**: Upgrade to paid tiers for better performance.

## 🔐 Security Checklist

- [x] Database password secured in environment variables
- [x] `.env` files in `.gitignore`
- [ ] Consider adding authentication (JWT)
- [ ] Rate limiting on API endpoints
- [ ] Input validation on all forms

## 🎉 You're Live!

Your AI Simplified Studio is now deployed and ready to use!

- **Frontend**: Create and manage video projects
- **Backend**: Handle API requests and database operations
- **Database**: Store project data persistently

Need help? Open an issue on GitHub!
