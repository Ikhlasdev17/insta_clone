const User = require("../models/user.model")

exports.checkValidUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    .populate("followers", "username _id")
    if (!user) {
      return res.status(404).json({ message: "user not found!" })
    } else {
      req.anyUser = user
      next()
    }

  } catch (error) {
    return res.status(404).json({ message: "user not found!" })
  }
}