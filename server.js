const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const users = require("./api/users");

const db = require("./config/keys.js").mongoURI;

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.get("/", (req, res) => {
  res.status(200).json("I'm Alive");
});

server.use("/api/users", users);

module.exports = server;
