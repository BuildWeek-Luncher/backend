const express = require("express");
const server = express();

const helmet = require("helmet");
const userRouter = require("../api/users/userRouter");

server.use(helmet());
server.use(express.json());

server.use("/api/auth", userRouter);

module.exports = server;
