const express = require("express");
const Image = require("../models/Image");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
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

//Stores image in uploads folder
//Using multer and creates a ref to the file
router.post(
  "/uploadmulter",
  upload.single("imageData"),
  async (req, res, next) => {
    console.log(req.body, "fffdsfa");
    const newImage = new Image({
      imageName: req.body.imageName,
      imageData: req.file.path
    });

    try {
      const imageUp = await newImage.save();
      res.status(200).json(imageUp);
    } catch (err) {
      res.status({
        message: "Error in uploading image"
      });
    }
  }
);

// router.route("/uploadBase").post((req, res, next) => {
//   const newImage = new Image({
//     imageName: req.body.imageName,
//     imageData: req.body.imageData
//   });

//   newImage
//     .save()
//     .then(res => {
//       res.status(200).json({ success: true, document: res });
//     })
//     .catch(err => next(err));
// });

module.exports = router;
