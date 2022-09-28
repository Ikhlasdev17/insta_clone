const { Schema, model } = require("mongoose");

const PostSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  comments: [
    {
      text: {
        type: String,
        required: true
      },
      commentBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
      }
    }
  ] 
}, {
  timestamps: true
})


module.exports = model("Post", PostSchema)