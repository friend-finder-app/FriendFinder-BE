const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../config/jwt.js");

const hashPass = (req, res, next) => {
  const user = req.body;
  if (user.password.length < 8) {
    res.status(406).json("Password must be at least 8 characters");
  } else {
    const hash = bcrypt.hashSync(user.password, 14);
    user.password = hash;
    next();
  }
};

const authZ = async (req, res, next) => {
  try {
    const { password, email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json("User not found");
    }
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.generateToken(user);
      req.token = token;
      next();
    } else {
      res.status(404).json("Invalid username or password!");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error!");
  }
};

const protectedRoute = (req, res, next) => {
  const token = jwt.verifyToken(req.headers.token);
  if (token) {
    next();
  } else {
    res.status(403).json("You are not Authorized!");
  }
};

module.exports = {
  hashPass,
  authZ,
  protectedRoute
};
