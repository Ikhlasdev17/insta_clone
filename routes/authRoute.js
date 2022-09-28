const { register, login, getMe } = require("../controllers/auth.controller")
const { checkAuth } = require("../middlewares/auth.middleware")

const router = require("express").Router()

router.post("/register", register)
router.post("/login", login)
router.get("/me", checkAuth, getMe )


module.exports = router