const express = require("express");
const http = require("http");
const path = require("path");
const { getFormatted } = require("./server/timer");
const initStreamlabs = require("./server/streamlabs");

require("dotenv").config();

const app = express();
const server = http.createServer(app);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Endpoint HTTP para polling de tiempo
app.get("/time", (req, res) => {
    res.send(getFormatted());
});

// Inicializar lógica de eventos
initStreamlabs();

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`[Server] Running on port ${PORT}`);
});
