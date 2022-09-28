const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    default: "https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png"
  },
  password: {
    type: String,
    required: true
  },
  followings: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followers: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
}, {
  timestamps: true
})


module.exports = model("User", UserSchema)