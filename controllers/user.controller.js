const User = require("../models/user.model")

exports.follow = async (req, res) => {
  try {
    if (req.anyUser._id.toString() === req.user.id.toString()) return res.status(401).json({ message: "You can't follow yourself! " })

    User.findByIdAndUpdate(req.params.id, {
      $push: { followers: req.user.id }
    }, {
      new: true
    })
    .exec((err, result) => {
      if (err) return res.status(400).json({ message: "Failed to follow user!" })
      
      User.findByIdAndUpdate(req.user.id, {
        $push: { followings: req.params.id }
      },{
        new: true
      })
      .exec((err2, result2) => {
        if (err2) return res.status(400).json({ message: "Failed to follow user!" })
        res.status(200).json({ message: "Followed success!", payload: result })
      })
    })

  } catch (error) {
    return res.status(400).json({ message: "Failed to follow user" })
  }
}

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .populate("followers", "username _id")

    res.status(200).json({ message: "Success", users })
  } catch (error) {
    return res.status(400).json({ message: "Failed to get all users" })
  }
}


exports.getUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "success", payload: req.anyUser })
  } catch (error) {
    return res.status(404).json({ message: "User not found!" })
  }
}