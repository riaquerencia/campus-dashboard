# 🎓 Unified Campus Intelligence Dashboard

A smart campus dashboard with an embedded AI Assistant that queries independent MCP (Model Context Protocol) servers for real-time data from library, cafeteria, events, and academics.

## 🏗️ Architecture

```
campus-dashboard/
├── frontend/          # React / Next.js UI
└── backend/
    ├── api/           # Express gateway (port 4000)
    └── mcp-servers/
        ├── library/   # Port 5001
        ├── cafeteria/ # Port 5002
        ├── events/    # Port 5003
        └── academics/ # Port 5004
```

## ✨ Features

- **AI Assistant** — Ask natural-language questions; it routes to the right MCP server
- **Library MCP** — Book availability, search catalog
- **Cafeteria MCP** — Today's menu, timings
- **Events MCP** — Club events, workshops, fests
- **Academics MCP** — Timetables, handbooks, deadlines
- **Unified Dashboard** — All data in one view

## 🚀 Quick Start

### 1. Clone & Install

```bash
git clone <your-repo-url>
cd campus-dashboard

# Install all dependencies
npm run install:all
```

### 2. Set Environment Variables

```bash
# backend/api/.env
ANTHROPIC_API_KEY=your_key_here
PORT=4000

# frontend/.env.local
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Run Everything

```bash
# From root — starts all servers concurrently
npm run dev
```

This starts:
- Frontend on http://localhost:3000
- API Gateway on http://localhost:4000
- Library MCP on http://localhost:5001
- Cafeteria MCP on http://localhost:5002
- Events MCP on http://localhost:5003
- Academics MCP on http://localhost:5004

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js 14, Tailwind CSS |
| Backend / MCP Servers | Node.js + Express |
| AI Integration | Anthropic Claude API (tool calling) |
| Hosting | Vercel (frontend), Render (backend) |

## 📦 Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
```

### Backend → Render
- Push repo to GitHub
- Create a new Web Service on [render.com](https://render.com)
- Set `npm run start:backend` as the start command
- Add `ANTHROPIC_API_KEY` in environment variables

## 📹 Demo Video
[Link to demo video]

## 👥 Team
[Your name / team]
