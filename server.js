const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const GRIDSIZE = 10;

let game = {
  money: 20,
  houses: 1,
  mines: 1,
  target: 0,
  grid: []
};

function initGrid() {
  game.grid = [];

  for (let i = 0; i < GRIDSIZE; i++) {
    let row = [];
    for (let j = 0; j < GRIDSIZE; j++) {
      row.push("forest");
    }
    game.grid.push(row);
  }

  game.grid[0][0] = "house";
  game.grid[0][1] = "mine";
}

initGrid();

app.get("/api/game", (req, res) => {
  res.json(game);
});

app.post("/api/action", (req, res) => {
  const { type, row, col } = req.body;

  const tile = game.grid[row]?.[col];
  if (!tile)
    return res.status(400).json({ error: "Invalid tile" });

  if (type === "chop") {
    if (game.money < 5)
      return res.status(400).json({ error: "Not enough money" });

    if (tile !== "forest")
      return res.status(400).json({ error: "Not forest" });

    game.money -= 5;
    game.grid[row][col] = "grass";
  }

  if (type === "house") {
    if (game.money < 10)
      return res.status(400).json({ error: "Not enough money" });

    if (tile !== "grass")
      return res.status(400).json({ error: "Build on grass" });

    game.money -= 10;
    game.houses++;
    game.grid[row][col] = "house";
  }

  if (type === "mine") {
    if (game.money < 10)
      return res.status(400).json({ error: "Not enough money" });

    if (tile !== "grass")
      return res.status(400).json({ error: "Build on grass" });

    if (game.mines >= game.houses)
      return res.status(400).json({ error: "Need more houses" });

    game.money -= 10;
    game.mines++;
    game.grid[row][col] = "mine";
  }

  res.json(game);
});

app.post("/api/endTurn", (req, res) => {

  game.money += game.mines * 10;

  if (game.money < game.target) {
    return res.json({ lost: true, game });
  }

  game.target += Math.floor(Math.random() * 4);

  res.json({ lost: false, game });
});

app.listen(PORT, () =>
  console.log("Server running on", PORT)
);