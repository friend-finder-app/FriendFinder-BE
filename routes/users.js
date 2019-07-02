const express = require("express");
const mw = require("../middleware");

const router = express.Router();

// importing User Model
const Users = require("../models/userModel");

/**
 * Method: POST
 * Endpoint: /api/users/register
 * Requires: `req.body: email`, `req.body: password`, `req.body: username`, `etc...`
 * Returns: newly inserted user object
 * Middleware: `hashPass` hashes user's password
 */
router.post("/register", mw.hashPass, async (req, res) => {
  try {
    const newUser = new Users(req.body);

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
 * Endpoint: /api/users/login
 * Requires: `req.body: email`, `req.body: password`
 * Returns: Json Token if user logs in successfully
 * Middleware: `authZ` validates the user's credentials
 */
router.post("/login", mw.authZ, (req, res) => {
  res.status(202).json({ message: "Logged in Successfully", token: req.token });
});

/**
 * Method: GET
 * Endpoint: /api/users/
 * Requires: Json WebToken in `req.header`
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

/**
 * Method: GET
 * Endpoint: /api/users/:id
 * Requires: Json WebToken in `req.header`
 * Returns: A user with the specified ID
 * Middleware: `protectedRoute` checks to see if client sends token in the header
 */
router.get("/:id", mw.protectedRoute, async (req, res) => {
  try {
    const data = await Users.findById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

/**
 * Method: DELETE
 * Endpoint: /api/users/:id
 * Requires: Json WebToken in `req.header`
 * Returns: Removes the specified user from the database
 * Middleware: `protectedRoute` checks to see if client sends token in the header
 */
router.delete("/:id", mw.protectedRoute, async (req, res) => {
  try {
    const data = await Users.remove(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

/**
 * Method: PATCH
 * Endpoint: /api/users/:id
 * Requires: Json WebToken in `req.header` and `req.body`
 * Returns: Removes the specified user from the database
 * Middleware: `protectedRoute` checks to see if client sends token in the header
 */
router.patch("/:id", mw.protectedRoute, async (req, res) => {
  try {
    const updates = req.body;
    const data = await Users.updateOne({ _id: req.params.id }, updates);
    res.status(202).json(data);
  } catch (err) {
    res.status(500).json(err, "Internal Server Error!");
  }
});

module.exports = router;
