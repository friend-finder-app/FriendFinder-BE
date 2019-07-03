const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//Routes
const users = require("./routes/users");
const images = require("./routes/images");

const db = require("./config/keys.js").mongoURI;

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

//Setting up headers for img-uploading..
//Dont actually know what it does tbh
server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "*"); // enables all the methods to take place
  return next();
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(err => console.log({ err, error: "Couldnt Connect to Mongo DB" }));

server.use(bodyParser.json({ limit: "50mb" }));
server.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

server.get("/", (req, res) => {
  res.status(200).json("I'm Alive");
});

//This is where images are uploaded
server.use("/uploads", express.static("uploads"));

//Routes
server.use("/api/users", users);
server.use("/api", images);

module.exports = server;
