const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
  // phone: {
  //   type: Number,
  //   required: true
  // },
  // photo: {
  //   type: BSONRegexp,
  //   required: true
  // },
  // state: {
  //   type: String,
  //   required: true
  // },
  // city: {
  //   type: String,
  //   required: true
  // },
  // bio: {
  //   type: String,
  //   required: true
  // }
});

module.exports = mongoose.model("Users", UserSchema);
