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
  },
  phone: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  bio: {
    type: String
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  // dateOfBirth: {
  //   type: Date,
  //   required: true
  // },
  hobbies: {
    type: [String]
  }
  // imageName: {
  //   type: String,
  //   default: "none",
  //   required: false
  // },
  // imageData: {
  //   type: String,
  //   required: false
  // }
});

module.exports = mongoose.model("Users", UserSchema);
