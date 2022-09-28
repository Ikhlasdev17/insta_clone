const { follow, getAllUsers, getUser } = require('../controllers/user.controller')
const { checkAuth } = require('../middlewares/auth.middleware')
const { checkValidUser } = require('../middlewares/checkValidUser.middleware')

const router = require('express').Router()

router.get("/all", checkAuth, getAllUsers)
router.put('/follow/:id', checkAuth, checkValidUser, follow)
router.get("/:id", checkAuth, checkValidUser, getUser)

module.exports  = router