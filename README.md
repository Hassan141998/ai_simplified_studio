# AI Simplified Studio 🎬

> A production-ready full-stack web application that converts text scripts into YouTube videos for the "AI Simplified" channel.

![AI Simplified Studio](https://img.shields.io/badge/status-production--ready-brightgreen) ![React](https://img.shields.io/badge/React-18-blue) ![FastAPI](https://img.shields.io/badge/FastAPI-latest-009688) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![Tailwind](https://img.shields.io/badge/Tailwind-3.x-38bdf8)

## 🌟 Features

- **Modern Dark UI** - Stunning interface with glassmorphism and smooth animations
- **Project Management** - Create and manage multiple video projects
- **Script Editor** - Real-time character count and validation
- **Simulated AI Generation** - TTS audio and video rendering simulation
- **Status Tracking** - Real-time progress updates through generation phases
- **Download System** - ZIP bundle generation with all project assets
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Type-Safe** - Full TypeScript implementation

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 16+
- npm or yarn

### Backend Setup

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

Backend will run at: **http://localhost:8000**  
API Documentation: **http://localhost:8000/docs**

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at: **http://localhost:5173**

## 🎨 Tech Stack

### Backend
- **FastAPI** - Modern Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database
- **Uvicorn** - Lightning-fast ASGI server
- **Pydantic** - Data validation

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Next-gen build tool
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animation library
- **Lucide React** - Beautiful icons
- **React Router DOM** - Client-side routing

## 📁 Project Structure

```
ai_simplified_studio/
├── backend/
│   ├── app/
│   │   ├── main.py           # FastAPI application
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── api.py            # API endpoints
│   │   └── services/
│   │       └── generator.py  # Video generation logic
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── pages/            # Page components
│   │   ├── api.ts            # API client
│   │   ├── App.tsx           # Main app
│   │   └── main.tsx          # Entry point
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

## 🎯 Usage

1. **Create a Project**: Click "New Project" on the dashboard
2. **Write Your Script**: Enter your video script in the editor
3. **Generate Video**: Click "Generate Video" to start the process
4. **Monitor Progress**: Watch as the status updates through each phase
5. **Download Assets**: Once complete, download your video bundle

## 🎨 Design System

### Color Palette
- **Background Primary**: `#0A0A0F`
- **Background Secondary**: `#18181B`
- **Surface Elevated**: `#1F1F23`
- **Brand Primary**: `#6366F1` (Indigo)
- **Brand Secondary**: `#EC4899` (Pink)
- **Brand Tertiary**: `#8B5CF6` (Purple)
- **Success**: `#10B981` (Green)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: Regular (400), Medium (500), Bold (700)

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/projects/` | Create a new project |
| `GET` | `/api/projects/` | List all projects |
| `GET` | `/api/projects/{id}` | Get project details |
| `PUT` | `/api/projects/{id}` | Update project |
| `POST` | `/api/projects/{id}/generate` | Start video generation |
| `GET` | `/api/projects/{id}/download` | Download project assets |

## 🧪 Testing

The application has been thoroughly tested with end-to-end browser automation:
- ✅ Project creation
- ✅ Script editing
- ✅ Video generation workflow
- ✅ Status tracking
- ✅ Asset download

## 🌐 Deployment

### Backend (Render/Heroku/Railway)
```bash
# Install dependencies
pip install -r requirements.txt

# Start server
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

### Frontend (Vercel/Netlify)
```bash
# Build for production
npm run build

# Preview
npm run preview
```

## 🔮 Future Enhancements

- [ ] Real AI integration (OpenAI TTS, video rendering APIs)
- [ ] User authentication (JWT)
- [ ] PostgreSQL database migration
- [ ] Cloud storage (AWS S3)
- [ ] Docker containerization
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Video preview player
- [ ] SRT subtitle editor
- [ ] Thumbnail customization
- [ ] Export to YouTube directly

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or feedback, please open an issue on GitHub.

---

**Built with ❤️ for AI Simplified**
