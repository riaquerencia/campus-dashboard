
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const menu = {
  monday:    { breakfast: ["Idli", "Sambar", "Chutney"], lunch: ["Rice", "Dal", "Sabzi", "Roti"], dinner: ["Khichdi", "Curd"] },
  tuesday:   { breakfast: ["Poha", "Tea"], lunch: ["Rajma", "Rice", "Salad"], dinner: ["Chapati", "Paneer"] },
  wednesday: { breakfast: ["Upma", "Juice"], lunch: ["Chole", "Rice", "Roti"], dinner: ["Pasta", "Soup"] },
  thursday:  { breakfast: ["Paratha", "Curd"], lunch: ["Dal Makhani", "Rice", "Naan"], dinner: ["Fried Rice", "Manchurian"] },
  friday:    { breakfast: ["Dosa", "Chutney"], lunch: ["Pulao", "Raita", "Papad"], dinner: ["Pizza", "Garlic Bread"] },
  saturday:  { breakfast: ["Sandwich", "Coffee"], lunch: ["Biryani", "Raita"], dinner: ["Noodles", "Spring Rolls"] },
  sunday:    { breakfast: ["Puri", "Aloo Bhaji"], lunch: ["Special Thali"], dinner: ["Kheer", "Roti", "Dal"] },
};

const timings = {
  breakfast: "7:30 AM – 9:30 AM",
  lunch:     "12:30 PM – 2:30 PM",
  dinner:    "7:30 PM – 9:30 PM",
};

const getDayName = () => {
  return ["sunday","monday","tuesday","wednesday","thursday","friday","saturday"][new Date().getDay()];
};

app.get("/manifest", (req, res) => {
  res.json({
    name: "cafeteria",
    description: "Campus cafeteria: today's menu and meal timings",
    tools: [
      { name: "get_todays_menu", description: "Get today's full menu", parameters: {} },
      { name: "get_meal", description: "Get a specific meal for today (breakfast/lunch/dinner)", parameters: { meal: "string" } },
      { name: "get_timings", description: "Get cafeteria meal timings", parameters: {} },
    ],
  });
});

app.post("/tools/get_todays_menu", (req, res) => {
  const day = getDayName();
  res.json({ day, menu: menu[day] });
});

app.post("/tools/get_meal", (req, res) => {
  const { meal } = req.body;
  if (!meal) return res.status(400).json({ error: "meal is required (breakfast/lunch/dinner)" });
  const day = getDayName();
  const items = menu[day][meal.toLowerCase()];
  if (!items) return res.json({ found: false, message: `No menu found for ${meal}` });
  res.json({ meal, day, items, timing: timings[meal.toLowerCase()] });
});

app.post("/tools/get_timings", (req, res) => {
  res.json({ timings });
});

app.get("/health", (req, res) => res.json({ status: "ok", server: "cafeteria" }));

const PORT = 5002;
app.listen(PORT, () => console.log(`🍽️  Cafeteria MCP running on port ${PORT}`));
