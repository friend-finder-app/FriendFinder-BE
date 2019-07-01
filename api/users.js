const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// importing User Model
const User = require("../models/User");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users succesfully works" });
});

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});

router.get("/", async (req, res) => {
  try {
    const data = await "db";
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});
