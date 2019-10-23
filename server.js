const express = require("express");
const server = express();

const helmet = require("helmet");
const cors = require("cors");

// Routers
const authRouter = require("./api/routes/authRouter");
const schoolRouter = require("./api/routes/schoolRouter");

// Middleware
const errorHandler = require("./api/middleware/errorHandler");

server.use(cors());
server.use(helmet());
server.use(express.json());

server.use("/api/admins", authRouter);
server.use("/api/schools", schoolRouter);
server.use(errorHandler);

server.get("/api/", (req, res) => {
  res.status(200).json({ api: "is running!" });
});

module.exports = server;
