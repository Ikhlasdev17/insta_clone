const Post = require("../models/posts.model")

exports.checkValidPost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "photo _id username email")
      .populate("comments.commentBy", "_id photo username email")
    if (!post) {
      return res.status(404).json({ message: "Post not found!" })
    } else {
      req.post = post
      next()
    }

  } catch (error) {
    return res.status(404).json({ message: "Post not found!" })
  }
}