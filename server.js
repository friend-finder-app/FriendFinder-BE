const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");

// const users = require("./api/users");
const imagesRouter = require("./api/images.js");

const db = require("./config/keys.js").mongoURI;

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log({ err, error: "Couldnt Connect to Mongo DB" }));

server.get("/", (req, res) => {
  res.status(200).json("I'm Alive");
});

server.use("/uploads", express.static("uploads"));
server.use("/images", imagesRouter);

// server.use("/api/users", users);

module.exports = server;
