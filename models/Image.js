const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Image Schema
var ImageSchema = new Schema({
  imageName: {
    type: String,
    default: "none",
    required: true
  },
  imageData: {
    type: String,
    required: true
  }
});

var Image = mongoose.model("Image", ImageSchema);

module.exports = Image;
