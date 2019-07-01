const express = require("express");
const bcrypt = require("bcryptjs");

//express

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users succesfully works" });
});

router.post("/register", (req, res) => {});

router.post("/login", (req, res) => {});
