const router = require("express").Router()
const { checkAuth } = require("../middlewares/auth.middleware")
const User = require("../models/user.model")
const Post = require("../models/posts.model")
const { createPost, getAllPosts, getMyPosts, updatePost, deletePost, getMySubPost, likePost, commentPost, getSinglePost, getThisUserPosts } = require("../controllers/posts.controller")
const { checkValidPost } = require("../middlewares/checkValidPost.middleware")
const { checkValidUser } = require("../middlewares/checkValidUser.middleware")

router.get("/all", getAllPosts)
router.get("/myposts", checkAuth, getMyPosts)
router.get("/mysubpost", checkAuth, getMySubPost)
router.get("/:id", checkAuth, checkValidPost, getSinglePost)
router.get("/user/:id", checkAuth, checkValidUser, getThisUserPosts)

router.post("/create", checkAuth, createPost)

router.put("/update/:id", checkAuth, checkValidPost, updatePost)
router.put("/like/:id", checkAuth, checkValidPost, likePost)
router.put("/comment/:id", checkAuth, checkValidPost, commentPost)

router.delete("/:id", checkAuth, checkValidPost, deletePost)
module.exports = router
