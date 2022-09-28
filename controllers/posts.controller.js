const Post = require("../models/posts.model")
const User = require("../models/user.model")

exports.createPost = async (req, res) => {
  try {
    const { photo, description } = req.body

    if (!description || !photo) return res.status(422).json({ message: "All fields is required!" })

    const post = new Post({ photo, description, author: req.user.id })
      

    post.save()
      .then(async (savedPost) => {
        console.log(savedPost);
        const newPOst = await Post.findById(savedPost?._id)
          .populate("author", "_id username photo email")
          .populate("comments.commentBy","_id photo username email")
        return res.status(201).json({ message: "Post created success!", post: newPOst })
      })
      .catch((err) => {
        return res.status(422).json({ message: "Failed to create post!", error: err })
      })

  } catch (error) {
    return res.status(422).json({ message: "Failed to create post!", error: error })
    
  }
} 

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find({})
    .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
    return res.status(200).json({ message: "success", posts })

  } catch (error) {
    return res.status(400).json({ message: "Failed to fetch posts!" })
  }
}

exports.getMyPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.user.id })
    .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
    res.status(200).json({ message:"success", posts })
  } catch (error) {
    return res.status(400).json({ message: "Failed to get my posts", error })
  }
} 

exports.getSinglePost = async (req, res) => {
  try {
    return res.status(200).json({ message:"Success!", payload: req.post })
  } catch (error) {
    return res.status(400).json({ message: "Post not found" })
  }
}

exports.updatePost = async (req, res) => {
  try {
 
    const doMatch = req.post.author.toString() === req.user.id.toString()

    if (!doMatch) return res.status(401).json({ message: "You can update only your posts!" }) 

    Post.findByIdAndUpdate(req.params.id, req.body)
    .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
      .exec((err, result) => {
        if (err) return res.status(400).json({ message: "Failed to update post!" })

        return res.status(200).json({ message:"Post updated" })
      }) 
    } catch (error) {
      return res.status(400).json({ message: "Failed to update post!" })
    
  }
}

exports.deletePost = async (req, res) => {
  try {

    const post = await Post.findById(req.params.id)
    
    const doMatch = post?.author.toString() === req.user.id.toString()

    if (!doMatch) return res.status(401).json({ message: "You can delete only your posts!" })

    Post.findByIdAndRemove(req.params.id)
      .exec((err, result) => {
        if (err) return res.status(400).json({ message: "Failed to delete post" })
        
        return res.status(200).json({ message: "Post deleted!" })
      })
    } catch (error) {
      return res.status(400).json({ message: "Failed to delete post" })
  }
}

exports.getMySubPost = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    const posts = await Post.find({ author: { $in:user.followings }})
    .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
      
    res.status(200).json({ message: "Success", posts })

  } catch (error) {
    return res.status(400).json({ message: "Posts not found!" })
  }
}

exports.likePost = async (req, res) => {
  try {
    if (req.post.likes.includes(req.user.id)) {
      Post.findByIdAndUpdate(req.params.id, {
        $pull: { likes: req.user.id }
      },{ new: true })
      .populate("author", "_id username photo email")
      .populate("comments.commentBy","_id photo username email")
        .exec((err, result) => {
          if (err) return res.status(400).json({ message: "Failed to unlike post" })
  
          return res.status(200).json({ message: "You unliked this post", payload: result })
        })
    } else {
      Post.findByIdAndUpdate(req.params.id, {
        $push: { likes: req.user.id }
      },{ new: true })
      .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
        .exec((err, result) => {
          if (err) return res.status(400).json({ message: "Failed to like post" })
  
          return res.status(200).json({ message: "You liked this post", payload: result })
        })
    }
    
  } catch (error) {
    return res.status(400).json({ message: "Failed to like post" })
  }
}

exports.commentPost = async (req, res) => {
  try {
    const { text } = req.body
    if (!text) return res.status(422).json({ message: "Comment text is required" })

    const comment = {
      text,
      commentBy: req.user.id
    }

    Post.findByIdAndUpdate(req.params.id, {
      $push: { comments: comment }
    }, {
      new: true
    })
    .populate("author", "_id username photo email")
    .populate("comments.commentBy","_id photo username email")
    .exec((err, result) => {
      if (err) return res.status(400).json({ message: "Failed to comment post!" })

      return res.status(200).json({ message: "Comment success added!", payload: result })
    })

  } catch (error) {
    return res.status(400).json({ message: "Failed to comment posts" })
  }
}

exports.getThisUserPosts = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate("author", "_id username photo email")
      .populate("comments.commentBy","_id photo username email")  
    return res.status(200).json({ message: "Success", payload: posts })
  } catch (error) {
    return res.status(404).json({ message: "Posts not found!" })
  }
}