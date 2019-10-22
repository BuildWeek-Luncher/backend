const express = require("express");
const server = express();

const helmet = require("helmet");
const authRouter = require("./api/routes/authRouter");
const errorHandler = require("./api/middleware/errorHandler");

server.use(helmet());
server.use(express.json());

server.use("/api/", authRouter);

server.use(errorHandler);

module.exports = server;