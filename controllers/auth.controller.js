const User = require("../models/user.model")
const CryptoJS = require("crypto-js")
const jwt = require('jsonwebtoken')

const generateToken = (id, username) => {
  const token = jwt.sign({ id: id, name: username }, "secret ikhlas", {expiresIn: "10h"})
  return token
}

exports.register = async (req, res) => {
  try {
    const { email, password, username, photo } = req.body

    if (!email || !password || !username) return res.status(422).json({ message: "All field is required!" })

    const isUsed = await User.findOne({ email })

    if (isUsed) return res.status(409).json({ message: "This email is already exist!" })

    const hashedPass = CryptoJS.AES.encrypt(password, "secret ikhlas").toString();

    const newUser = new User({email, username, password: hashedPass, photo})

    newUser.save()
      .then((savedUser) => {
        return res.status(201).json({message: "User created!", user: savedUser})
      })
      .catch((err) => {
        return res.status(400).json({ message: "Failed to register user!" })
      })
      
    } catch (error) {
      return res.status(400).json({ message: "Failed to register user!" })
  }
}

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) return res.status(422).json({ message: "All field is required!" })

    const user = await User.findOne({ email })

    if (!user) return res.status(404).json({ message: "User not found!" })

    const passBytes = CryptoJS.AES.decrypt(user.password, "secret ikhlas")
    const passwordDoMatch = passBytes.toString(CryptoJS.enc.Utf8)
    console.log(password);
    console.log(passwordDoMatch);
    if (password !== passwordDoMatch) return res.status(401).json({ message: "Email or password is incorrect!" })

    const token = generateToken(user?._id, user?.username)
    
    console.log(user);
    return res.status(200).json({ 
      message: "Successfully logged in!", 
      payload: {
        access_token: token,
        user
    } })

  } catch (error) {
    return res.status(400).json({ message: "Failed to login!" })
  }
}

exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)

    if (!user) return res.status(404).json({ message: "User not found!" })
    
    const token = generateToken(user?._id, user?.username)

    const { password, created_at, updated_at, ...other } = user._doc
    return res.status(200).json({ 
      message: "Successfully verified token!",
      payload: {
        user,
        access_token: token
      }
    })
  } catch (error) {
    return res.status(400).json({ message: "Failed to verify get me!" })
  }
}
