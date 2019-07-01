const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const cors = require("cors");

const users = require("./api/users");

const db = require("./config/keys.js").mongoURI;

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log({ err, error: "Couldnt Connect to Mongo DB" }));

server.get("/", (req, res) => {
  res.status(200).json("I'm Alive");
});

server.use("/api/users", users);

const port = process.env.PORT || 9000;

server.listen(port, () => console.log(`Port ${port} is live`));

module.exports = server;
