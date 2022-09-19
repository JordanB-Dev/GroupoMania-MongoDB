const jwt = require('jsonwebtoken')
const UserModel = require('../models/userModel')
const PostModel = require('../models/postModel')

module.exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null
        res.cookie('jwt', '', { maxAge: 1 })
        next()
      } else {
        let user = await UserModel.findById(decodedToken.id)
        res.locals.user = user

        next()
      }
    })
  } else {
    res.locals.user = null
    next()
  }
}

module.exports.isAuth = (req, res, next) => {
  const token = req.cookies.jwt
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err)
        res.send(200).json('no token')
      } else {
        req.user = decodedToken
        req.post = decodedToken
        console.log(decodedToken.id)
        next()
      }
    })
  } else {
    console.log('No token')
    res.status(401).json({
      error: 'Authentication required !',
    })
  }
}

module.exports.isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401).send({ message: 'Invalid Admin Token' })
  }
}
