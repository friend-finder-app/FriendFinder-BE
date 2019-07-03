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
    required: false
  },
  lastName: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: false
  },
  // dateOfBirth: {
  //   type: Date,
  //   required: true
  // },
  hobbies: {
    type: [String]
  },
  distance: {
    type: String,
    default:''
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
