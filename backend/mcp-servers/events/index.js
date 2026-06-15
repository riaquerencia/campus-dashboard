// MCP Server: Events (Port 5003)
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const events = [
  { id: 1, name: "TechFest Workshop: ML Basics", club: "AI Club", date: "2025-06-20", time: "2:00 PM", venue: "Lab 301", category: "workshop" },
  { id: 2, name: "Annual Hackathon", club: "Coding Club", date: "2025-06-22", time: "9:00 AM", venue: "Main Hall", category: "hackathon" },
  { id: 3, name: "Photography Walk", club: "Photo Club", date: "2025-06-18", time: "6:00 AM", venue: "Campus Grounds", category: "cultural" },
  { id: 4, name: "Debate Competition", club: "Literary Club", date: "2025-06-19", time: "3:00 PM", venue: "Seminar Hall", category: "competition" },
  { id: 5, name: "React.js Bootcamp", club: "Web Dev Society", date: "2025-06-21", time: "10:00 AM", venue: "CS Lab", category: "workshop" },
];

app.get("/manifest", (req, res) => {
  res.json({
    name: "events",
    description: "Campus events: upcoming events, workshops, and club activities",
    tools: [
      { name: "list_upcoming_events", description: "List all upcoming campus events", parameters: {} },
      { name: "search_events", description: "Search events by keyword or category", parameters: { query: "string" } },
      { name: "get_events_by_date", description: "Get events on a specific date (YYYY-MM-DD)", parameters: { date: "string" } },
    ],
  });
});

app.post("/tools/list_upcoming_events", (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = events.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  res.json({ events: upcoming });
});

app.post("/tools/search_events", (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "query is required" });
  const q = query.toLowerCase();
  const results = events.filter(
    (e) =>
      e.name.toLowerCase().includes(q) ||
      e.club.toLowerCase().includes(q) ||
      e.category.toLowerCase().includes(q)
  );
  res.json({ results });
});

app.post("/tools/get_events_by_date", (req, res) => {
  const { date } = req.body;
  if (!date) return res.status(400).json({ error: "date is required (YYYY-MM-DD)" });
  const results = events.filter((e) => e.date === date);
  res.json({ date, results });
});

app.get("/health", (req, res) => res.json({ status: "ok", server: "events" }));

const PORT = 5003;
app.listen(PORT, () => console.log(`🎉 Events MCP running on port ${PORT}`));
