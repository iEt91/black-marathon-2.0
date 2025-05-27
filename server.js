const express = require("express");
const http = require("http");
const path = require("path");
const {
  getFormatted,
  getEndingTimeISO,
  isPaused
} = require("./server/timer");
const initStreamlabs = require("./server/streamlabs");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(express.static(path.join(__dirname, "public")));

app.get("/time", (req, res) => {
  res.json({
    endingTime: getEndingTimeISO(),
    paused: isPaused()
  });
});

initStreamlabs();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`[Server] Running on port ${PORT}`);
});
