const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("../config/jwt.js");
const JWT = require("jsonwebtoken");

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
      console.log(token);
      req.user_id = user.id;
      req.token = token;
      next();
    } else {
      res.status(404).json("Invalid username or password!");
    }
  } catch (err) {
    res.status(500).json("Internal Server Error!");
  }
};

//Using JWT not jwt.js --- Check if this affects anything - Roenz
const protectedRoute = (req, res, next) => {
  const token = req.headers["token"];
  console.log(token, "token");
  JWT.verify(token, jwt.secretKey, (err, decoded) => {
    console.log("i made it here protected router middleware");
    if (err) {
      return res
        .status(500)
        .send({ authed: false, message: "The token could not be verified " });
    }
    req.user_id = decoded.id;
    console.log(req.user_id, `ids im trying to console log`);
    next();
  });
};

module.exports = {
  hashPass,
  authZ,
  protectedRoute
};
