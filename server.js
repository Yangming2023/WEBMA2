const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));


app.post("/api/game", (req, res) => {
  const db = readDB();
  db.gameState = req.body;
  writeDB(db);
  res.json({ ok: true });
});

app.get("/api/game", (req, res) => {
  const db = readDB();
  res.json(db.gameState);
});

app.put("/api/game", (req, res) => {
  const db = readDB();
  db.gameState = req.body;
  writeDB(db);
  res.json({ ok: true });
});

app.delete("/api/game", (req, res) => {
  const db = readDB();
  db.gameState = null;
  writeDB(db);
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
