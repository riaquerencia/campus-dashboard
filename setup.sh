#!/bin/bash
echo "📦 Installing all dependencies..."

echo "\n→ Root"
npm install

echo "\n→ Frontend"
cd frontend && npm install && cd ..

echo "\n→ API Gateway"
cd backend/api && npm install && cd ../..

echo "\n→ Library MCP"
cd backend/mcp-servers/library && npm install && cd ../../..

echo "\n→ Cafeteria MCP"
cd backend/mcp-servers/cafeteria && npm install && cd ../../..

echo "\n→ Events MCP"
cd backend/mcp-servers/events && npm install && cd ../../..

echo "\n→ Academics MCP"
cd backend/mcp-servers/academics && npm install && cd ../../..

echo "\n✅ All dependencies installed!"
echo "\n📝 Next steps:"
echo "  1. Add your ANTHROPIC_API_KEY to backend/api/.env"
echo "  2. Run: npm run dev"
echo "  3. Open http://localhost:3000"
