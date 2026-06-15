const path = require("path");

const express = require("express");
const cors = require("cors");
const axios = require("axios");
const Groq = require("groq-sdk");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

// PASTE YOUR GROQ KEY HERE:
process.env.GROQ_API_KEY = "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";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const MCP = {
  library:   "http://localhost:5001",
  cafeteria: "http://localhost:5002",
  events:    "http://localhost:5003",
  academics: "http://localhost:5004",
};

async function callMCP(server, tool, body = {}) {
  try {
    const { data } = await axios.post(`${MCP[server]}/tools/${tool}`, body, { timeout: 4000 });
    return data;
  } catch { return null; }
}

async function gatherMCPData(message) {
  const msg = message.toLowerCase();
  const results = {};
  if (msg.includes("book") || msg.includes("library") || msg.includes("available")) {
    const query = message.replace(/is|available|in the|library|\?|please|can you|check|find|search/gi, "").trim() || "all";
    results.library = await callMCP("library", "search_books", { query });
  }
  if (msg.includes("menu") || msg.includes("food") || msg.includes("lunch") || msg.includes("dinner") || msg.includes("breakfast") || msg.includes("cafeteria")) {
    results.cafeteriaMenu = await callMCP("cafeteria", "get_todays_menu");
  }
  if (msg.includes("event") || msg.includes("workshop") || msg.includes("fest") || msg.includes("hackathon") || msg.includes("club")) {
    results.events = await callMCP("events", "list_upcoming_events");
  }
  if (msg.includes("class") || msg.includes("timetable") || msg.includes("schedule") || msg.includes("today")) {
    results.timetable = await callMCP("academics", "get_todays_timetable");
  }
  if (msg.includes("deadline") || msg.includes("assignment") || msg.includes("due")) {
    results.deadlines = await callMCP("academics", "get_upcoming_deadlines");
  }
  if (Object.keys(results).length === 0) {
    const [menu, events, timetable, deadlines] = await Promise.all([
      callMCP("cafeteria", "get_todays_menu"),
      callMCP("events", "list_upcoming_events"),
      callMCP("academics", "get_todays_timetable"),
      callMCP("academics", "get_upcoming_deadlines"),
    ]);
    results.cafeteriaMenu = menu; results.events = events;
    results.timetable = timetable; results.deadlines = deadlines;
  }
  return results;
}

app.post("/api/chat", async (req, res) => {
  const { message, history = [] } = req.body;
  if (!message) return res.status(400).json({ error: "message is required" });
  try {
    const mcpData = await gatherMCPData(message);
    const systemPrompt = `You are a helpful Campus AI Assistant with LIVE campus data:\n${JSON.stringify(mcpData, null, 2)}\nBe friendly, concise, use emojis.`;
    const completion = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: systemPrompt },
        ...history.map(h => ({ role: h.role === "assistant" ? "assistant" : "user", content: h.content })),
        { role: "user", content: message },
      ],
      max_tokens: 512,
    });
    res.json({ reply: completion.choices[0].message.content, toolsUsed: true });
  } catch (e) {
    res.status(500).json({ error: "AI error: " + e.message });
  }
});

app.get("/api/health", async (req, res) => {
  const statuses = {};
  for (const [name, url] of Object.entries(MCP)) {
    try { await axios.get(`${url}/health`, { timeout: 2000 }); statuses[name] = "online"; }
    catch { statuses[name] = "offline"; }
  }
  res.json({ api: "ok", mcpServers: statuses });
});

app.listen(process.env.PORT || 4000, () => console.log("🚀 Running on port 4000"));