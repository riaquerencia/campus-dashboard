
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());


const books = [
  { id: 1, title: "Introduction to Algorithms", author: "CLRS", available: true, copies: 3 },
  { id: 2, title: "The Pragmatic Programmer", author: "Hunt & Thomas", available: false, copies: 0 },
  { id: 3, title: "Clean Code", author: "Robert C. Martin", available: true, copies: 1 },
  { id: 4, title: "Design Patterns", author: "Gang of Four", available: true, copies: 2 },
  { id: 5, title: "Operating System Concepts", author: "Silberschatz", available: false, copies: 0 },
];


app.get("/manifest", (req, res) => {
  res.json({
    name: "library",
    description: "Campus library: search books, check availability",
    tools: [
      {
        name: "search_books",
        description: "Search for books by title or author",
        parameters: { query: "string" },
      },
      {
        name: "check_availability",
        description: "Check if a specific book is available",
        parameters: { title: "string" },
      },
      {
        name: "list_available_books",
        description: "List all currently available books",
        parameters: {},
      },
    ],
  });
});


app.post("/tools/search_books", (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: "query is required" });
  const q = query.toLowerCase();
  const results = books.filter(
    (b) => b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q)
  );
  res.json({ results });
});


app.post("/tools/check_availability", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "title is required" });
  const book = books.find((b) => b.title.toLowerCase().includes(title.toLowerCase()));
  if (!book) return res.json({ found: false, message: "Book not found in catalog" });
  res.json({ found: true, book });
});


app.post("/tools/list_available_books", (req, res) => {
  const available = books.filter((b) => b.available);
  res.json({ results: available });
});


app.get("/health", (req, res) => res.json({ status: "ok", server: "library" }));

const PORT = 5001;
app.listen(PORT, () => console.log(`📚 Library MCP running on port ${PORT}`));
