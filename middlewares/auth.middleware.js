const jwt = require('jsonwebtoken')

exports.checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '')

  if (token) {
    try {
        const decoded = jwt.verify(token, "secret ikhlas")
        
        req.user = { id: decoded?.id, username: decoded?.username }

        next()
    } catch (error) {
      return res.status(401).json({ mesage: "Unauthorized!" })
    }
  } else {
    return res.status(401).json({ mesage: "Unauthorized!" })
  }
}