const express = require("express");
const router = express.Router();
const mw = require("../middleware");

// importing User Model
const Users = require("../models/userModel");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users succesfully works" });
});

/**
 * mw.hashPass is middleware that uses bcryptjs to hash the password
 * Required Fields username, email, password
 * Returns newly created object
 */
router.post("/register", mw.hashPass, async (req, res) => {
  try {
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });

    // Checks database for existing email address returns error if there is an email
    const email = await Users.findOne({ email: req.body.email });
    if (email) {
      res.status(400).json("Email already exists please try again!");
    } else {
      //Saves the new user to the Database
      const data = await newUser.save();
      res.status(201).json(data);
    }
  } catch (err) {
    res.status(500).json({ err, message: "Internal Server Error!" });
  }
});

router.post("/login", mw.authZ, (req, res) => {
  res.status(202).json({ message: "Logged in Successfully", token: req.token });
});

router.get("/", async (req, res) => {
  try {
    const data = await "db";
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

module.exports = router;
