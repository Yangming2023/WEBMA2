const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));


app.post("/api/game", (req, res) => {
  db.gameState = req.body;
  res.json({ ok: true });
});

app.get("/api/game", (req, res) => {
  res.json(db.gameState);
});

app.put("/api/game", (req, res) => {
  db.gameState = req.body;
  res.json({ ok: true });
});

app.delete("/api/game", (req, res) => {
  db.gameState = null;
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
