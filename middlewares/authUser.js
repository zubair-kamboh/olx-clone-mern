const expressAsyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')
const AuthModel = require('../models/authModel')

const authUser = expressAsyncHandler(async (req, res, next) => {
  let token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      // verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)

      req.user = await AuthModel.findOne({ email: decoded.email }).select(
        '-password'
      )
    } catch (error) {
      res.status(401)
      throw new Error('Not authorized')
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }

  next()
})

module.exports = authUser
