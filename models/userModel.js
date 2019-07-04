const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
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
  dateOfBirth: {
    type: Date,
    required: false
  },
  hobbies: {
    type: [String]
  },
  distance: {
    type: String,
    default:''
  },
  // imageName: {
  //   type: String,
  //   default: "none",
  //   required: false
  // },
  // imageData: {
  //   type: String,
  //   required: false
  // }
  // imageName: [
  //   {
  //     type: String,
  //     default: "none",
  //     required: false
  //   }
  // ],
  // imageData: [
  //   {
  //     type: String,
  //     required: false
  //   }
  // ],
  images: [],
  friendRequest: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
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
  dateOfBirth: {
    type: Date,
    required: false
  },
  hobbies: {
    type: [String]
  },
  distance: {
    type: String,
    default:''
  },
   images: [],
    }
  ],
  friends: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
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
  dateOfBirth: {
    type: Date,
    required: false
  },
  hobbies: {
    type: [String]
  },
  distance: {
    type: String,
    default:''
  },
   images: [],
    }
    
  ],
  matched: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User"
      },
      username: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  password: {
    type: String,
    required: false
  },
  phone: {
    type: Number,
    required: false
  },
  state: {
    type: String,
    required: false
  },
  city: {
    type: String,
    required: false
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
  dateOfBirth: {
    type: Date,
    required: false
  },
  hobbies: {
    type: [String]
  },
  distance: {
    type: String,
    default:''
  },
   images: [],
    }
    
  ]
});

module.exports = mongoose.model("Users", UserSchema);
