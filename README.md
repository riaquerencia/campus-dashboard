# 🎓 Unified Campus Intelligence Dashboard

A smart campus dashboard with an embedded AI Assistant that queries independent MCP (Model Context Protocol) servers for real-time data from library, cafeteria, events, and academics.

## 🌐 Live Demo
**Frontend:** https://campus-dashboard-mauve.vercel.app

## 🏗️ Architecture

```
campus-dashboard/
├── frontend/          # React 
└── backend/
    ├── api/           # Express gateway (Groq AI)
    └── mcp-servers/
        ├── library/   # Book search & availability
        ├── cafeteria/ # Today's menu & timings
        ├── events/    # Campus events & workshops
        └── academics/ # Timetable & deadlines
```

## ✨ Features
- 🤖 AI Assistant powered by Groq (LLaMA 3.1)
- 📚 Library book search & availability
- 🍽️ Live cafeteria menu
- 🎉 Upcoming campus events
- 📖 Class timetable & deadlines
- 🔄 Independent MCP Servers for each data source

## 🛠️ Tech Stack
| Layer | Technology |
|---|---|
| Frontend | React + Vite, Tailwind CSS |
| Backend | Node.js + Express |
| AI | Groq API (LLaMA 3.1) |
| MCP Servers | Node.js + Express |
| Hosting | Vercel (frontend), Render (backend) |

## 🚀 Setup Instructions

### 1. Clone the repo
```bash
git clone https://github.com/riaquerencia/campus-dashboard.git
cd campus-dashboard
```

### 2. Install dependencies
```bash
cd backend/api && npm install && cd ../..
cd backend/mcp-servers/library && npm install && cd ../../..
cd backend/mcp-servers/cafeteria && npm install && cd ../../..
cd backend/mcp-servers/events && npm install && cd ../../..
cd backend/mcp-servers/academics && npm install && cd ../../..
cd frontend && npm install && cd ..
```

### 3. Add environment variable
Create `backend/api/.env`:

### 4. Run locally
Open 6 terminals and run:
```bash
node backend/mcp-servers/library/index.js
node backend/mcp-servers/cafeteria/index.js
node backend/mcp-servers/events/index.js
node backend/mcp-servers/academics/index.js
node backend/api/index.js
cd frontend && npx vite --port 3000
```

Open http://localhost:3000
## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js 14, Tailwind CSS |
| Backend / MCP Servers | Node.js + Express |
| AI Integration | Groq API (tool calling) |
| Hosting | Vercel (frontend), Render (backend) |



## 📹 Demo Video
[Link to demo video]

