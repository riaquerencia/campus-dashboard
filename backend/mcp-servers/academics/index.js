// MCP Server: Academics (Port 5004)
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const timetable = {
  monday:    [{ time: "9:00", subject: "Data Structures", room: "A101" }, { time: "11:00", subject: "DBMS", room: "B202" }],
  tuesday:   [{ time: "10:00", subject: "Operating Systems", room: "A103" }, { time: "2:00", subject: "Web Dev Lab", room: "CS Lab" }],
  wednesday: [{ time: "9:00", subject: "Computer Networks", room: "A101" }, { time: "11:00", subject: "Data Structures", room: "A101" }],
  thursday:  [{ time: "10:00", subject: "DBMS Lab", room: "CS Lab" }, { time: "2:00", subject: "Software Engineering", room: "B201" }],
  friday:    [{ time: "9:00", subject: "Operating Systems", room: "A103" }, { time: "11:00", subject: "Computer Networks", room: "A101" }],
};

const deadlines = [
  { id: 1, subject: "Data Structures", title: "Assignment 3 – AVL Trees", due: "2025-06-19" },
  { id: 2, subject: "DBMS", title: "Mini Project Submission", due: "2025-06-22" },
  { id: 3, subject: "Software Engineering", title: "SRS Document", due: "2025-06-25" },
];

const getDayName = () => {
  return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()];
};

app.get("/manifest", (req, res) => {
  res.json({
    name: "academics",
    description: "Academic info: timetable, deadlines, subjects",
    tools: [
      { name: "get_todays_timetable", description: "Get today's class schedule", parameters: {} },
      { name: "get_timetable_by_day", description: "Get timetable for a specific day", parameters: { day: "string" } },
      { name: "get_upcoming_deadlines", description: "Get upcoming assignment and project deadlines", parameters: {} },
    ],
  });
});

app.post("/tools/get_todays_timetable", (req, res) => {
  const day = getDayName();
  const classes = timetable[day] || [];
  res.json({ day, classes });
});

app.post("/tools/get_timetable_by_day", (req, res) => {
  const { day } = req.body;
  if (!day) return res.status(400).json({ error: "day is required" });
  const classes = timetable[day.toLowerCase()] || [];
  res.json({ day, classes });
});

app.post("/tools/get_upcoming_deadlines", (req, res) => {
  const today = new Date().toISOString().split("T")[0];
  const upcoming = deadlines.filter((d) => d.due >= today).sort((a, b) => a.due.localeCompare(b.due));
  res.json({ deadlines: upcoming });
});

app.get("/health", (req, res) => res.json({ status: "ok", server: "academics" }));

const PORT = 5004;
app.listen(PORT, () => console.log(`📖 Academics MCP running on port ${PORT}`));
