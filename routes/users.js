const express = require("express");
const mw = require("../middleware");

const router = express.Router();

// importing User Model
const Users = require("../models/userModel");

/**
 * Method: POST
 * Requires: `req.body: email`, `req.body: password`, `req.body: username`
 * Returns: newly inserted user object
 * Middleware: `hashPass` hashes user's password
 */
router.post("/register", mw.hashPass, async (req, res) => {
  try {
    const newUser = new Users({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      state: req.body.state,
      city: req.body.city,
      bio: req.body.bio,
      firstName: req.body.firstName,
      lastName: req.body.lastName
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

/**
 * Method: POST
 * Requires: `Req.body: email`, `Req.body: password`
 * Returns: Json Token if user logs in successfully
 * Middleware: `authZ` validates the user's credentials
 */
router.post("/login", mw.authZ, (req, res) => {
  res.status(202).json({ message: "Logged in Successfully", token: req.token });
});

/**
 * Method: GET
 * Requires: Json WebToken in `Req.Header`
 * Returns: List of Users in the database
 * Middleware: `protectedRoute` checks to see if client sends token in the header
 */
router.get("/", mw.protectedRoute, async (req, res) => {
  try {
    const data = await Users.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

module.exports = router;
