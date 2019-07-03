const express = require("express");
const mw = require("../middleware");
const multer = require("multer");

const router = express.Router();

const Image = require("../models/image");
const Users = require("../models/userModel");

//This is used for uploading photos into user accounts
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    //rejects storing a file
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter: fileFilter
});

/**
 * Method: POST
 * Endpoint: /api/users/uploadimage
 * Requires: Json WebToken in `req.header`
 * Returns: new length of images arr
 * Middleware: `protectedRoute` checks to see if client sends token in the header
 */
router.post(
  "/uploadimage",
  upload.single("imageData"),
  mw.protectedRoute,
  async (req, res) => {
    console.log("Beginning of post");
    console.log(req.user_id);
    console.log(typeof req.user_id);

    const newImage = await new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });
    const savedImage = await newImage.save();

    try {
      const currentUser = await Users.findById(req.user_id);
      const saveImage = await currentUser.images.push(savedImage);
      currentUser.save();
      console.log("currentUser OBJ", currentUser);
      res.status(201).json(saveImage);
    } catch (err) {
      res.status(500).json({ message: "Fail to upload image" });
    }
  }
);

module.exports = router;
