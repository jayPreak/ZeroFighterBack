const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());

const counterFile = path.join(__dirname, "counter.txt");

function readCounter() {
  if (fs.existsSync(counterFile)) {
    return parseInt(fs.readFileSync(counterFile, "utf-8"), 10);
  }
  return 0;
}

function writeCounter(value) {
  fs.writeFileSync(counterFile, value.toString(), "utf-8");
}

let counter = readCounter();

app.get("/increment", (req, res) => {
  counter++;
  writeCounter(counter);

  res.json({ counter });
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});
