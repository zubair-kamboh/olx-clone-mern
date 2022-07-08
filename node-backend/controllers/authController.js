const asynHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')
const jwt = require('jsonwebtoken')

// SIGNUP
const signup = asynHandler(async (req, res) => {
  const { fullname, phoneno, email, password, password2 } = req.body

  if (!fullname || !phoneno || !email || !password || !password2) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // check both passwords
  if (password !== password2) {
    res.status(400)
    throw new Error('Passwords do not match')
  }

  const emailExist = await AuthModel.findOne({ email })

  // check if email already exists
  if (emailExist) {
    res.status(400)
    throw new Error('Email already exists')
  }

  // save user
  const user = new AuthModel({
    fullname,
    phoneno,
    email,
    password,
  })

  await user.save()

  if (!user) {
    throw new Error('Something went wrong')
  }

  res.json({ message: 'Registered Successfully!' })
})

// SIGNIN
const signin = asynHandler(async (req, res) => {
  const { email, password, password2 } = req.body

  if (!email || !password || !password2) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // check both passwords
  if (password !== password2) {
    res.status(400)
    throw new Error('Passwords do not match')
  }

  // generate token
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '20m',
  })

  const user = await AuthModel.findOne({ email })

  // check if email do not exists
  if (!user) {
    res.status(400)
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // sign in user
  res.json({ message: 'Sign in successfully!', token })
})

module.exports = { signup, signin }
