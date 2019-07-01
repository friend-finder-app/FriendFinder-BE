const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// importing User Model
const User = require("../models/User");

router.get("/test", (req, res) => {
  res.status(200).json({ message: "Users succesfully works" });
});

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res
        .status(400)
        .json({ err: "Email already exists please try again" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        photo: req.body.photo,
        state: req.body.state,
        city: req.body.city,
        bio: req.body.bio
      });

      bcrypt.genSalt(13, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) {
            return res.json(err);
          }
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => res.json(err));
        });
      });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    bcrypt.compare(password, user.password).then(matches => {
      if (matches) {
        res.json({ message: "Successfully matched" });
      } else {
        return res.status(400).json({ error: "password incorrect" });
      }
    });
  });
});

module.exports = router;
