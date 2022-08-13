const asynHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')
const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const authModel = require('../models/authModel')
const { OAuth2Client } = require('google-auth-library')

const client = new OAuth2Client({
  clientId:
    '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
})

// nodemailer
const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'zubairkamboh9010@gmail.com', // generated ethereal user
    pass: 'bsssefjgpbwpaqld', // generated ethereal password
  },
  tls: {
    rejectUnauthorized: false,
  },
})

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

  // setup nodemailer
  const token = jwt.sign(
    { fullname, email, phoneno, password },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: '20m',
    }
  )

  // remove this after testing
  // res.json({
  //   token,
  // })

  try {
    await transporter.sendMail({
      from: 'noreply@yahoo.com',
      to: email,
      subject: 'Email Activation Link',
      html: `
      <h1>Please verify your account by clicking below link</h1>
      <a href='${process.env.CLIENT_URI}/activate/${token}'>${process.env.CLIENT_URI}/activate/${token}</a>
      `,
    })

    res.json({
      successMsg: 'Activation link sent to your email! please check.',
    })
  } catch (e) {
    throw new Error(e)
  }
})

// @route     /api/auth/activate
// @access    private
const activateAccount = asynHandler(async (req, res) => {
  // get token
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  // no token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized! no token')
  }

  // token exists
  const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

  // tempered token
  if (!tokenVerified) {
    res.status(403)
    throw new Error('Invalid or expired token')
  }

  const { fullname, phoneno, email, password } = tokenVerified

  // check if user alread exists
  const existUser = await AuthModel.findOne({ email })
  if (existUser) {
    res.status(401)
    throw new Error('User already exists with that email')
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

  // generate new token
  const newToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  res
    .status(201)
    .json({ successMsg: 'Registered Successfully!', token: newToken })
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
  // check passwords length
  if (password.length < 8 || password2.length < 8) {
    res.status(400)
    throw new Error('Minimum length should be 8 characters')
  }

  // generate token
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '1d',
  })

  const user = await AuthModel.findOne({ email })

  // check if email do not exists
  if (!user) {
    res.status(400)
    throw new Error("Email does'nt exist! Please sign up first")
  }

  // if passwords do not match
  if (user.password !== password) {
    res.status(400)
    throw new Error('Incorrect password!')
  }

  // sign in user
  res.json({
    successMsg: 'Sign in successfully!',
    token,
    user: {
      _id: user._id,
      email: user.email,
      phoneno: user.phoneno,
      fullname: user.fullname,
      ads: user.ads,
    },
  })
})

// route      /api/auth/forget
// access     public
// method     post
const forgotPassword = asynHandler(async (req, res) => {
  const { email } = req.body
  if (!email) {
    throw new Error('Please enter your email')
  }

  // check if user exist
  const user = await AuthModel.findOne({ email })
  if (!user) {
    res.status(400)
    throw new Error('No user exist with that email')
  }

  // generate token
  const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
    expiresIn: '20m',
  })

  try {
    await transporter.sendMail({
      from: 'noreply@yahoo.com',
      to: email,
      subject: 'Password Change Link',
      html: `
      <h1>Please change your account password by clicking below link</h1>
      <a href='${process.env.CLIENT_URI}/change-password/${token}'>${process.env.CLIENT_URI}/change-password/${token}</a>
      `,
    })

    res.json({
      successMsg: 'Please check your email.',
    })
  } catch (e) {
    res.status(500)
    throw new Error('Something went wrong')
  }
})

// route      /api/auth/change-password
// access     private
// method     put
const changePassword = asynHandler(async (req, res) => {
  const { password, password2 } = req.body
  if (!password || !password2) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  // check both passwords
  if (password !== password2) {
    res.status(400)
    throw new Error('Passwords do not match')
  }
  // check passwords length
  if (password.length < 8 || password2.length < 8) {
    res.status(400)
    throw new Error('Minimum length should be 8 characters')
  }

  // get token
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  // no token
  if (!token) {
    res.status(401)
    throw new Error('Not authorized! no token')
  }

  // token exists
  const tokenVerified = jwt.verify(token, process.env.JWT_SECRET_KEY)

  // tempered token
  if (!tokenVerified) {
    res.status(403)
    throw new Error('Invalid or expired token')
  }

  const { email } = tokenVerified

  // check if user alread exists and update
  const findUser = await AuthModel.findOne({ email })
  const updatedUser = await AuthModel.updateOne(
    { _id: findUser._id },
    {
      password,
    }
  )

  if (!updatedUser) {
    throw new Error('Something went wrong')
  }

  res.json({ successMsg: 'Your password has been updated' })
})

// LOGIN WITH GOOGLE
// route      /api/auth/googlelogin
// access     public
// method     post
const googleLogin = asyncHandler(async (req, res) => {
  // get token
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : null

  const verifiedToken = await client.verifyIdToken({
    idToken: token,
    audience:
      '755428588274-5nl45or7hrlck14neughadquor3bjaph.apps.googleusercontent.com',
  })

  const { name, email, picture, email_verified } = verifiedToken.payload

  // check invalid token
  if (!verifiedToken) {
    res.status(403)
    throw new Error('Not authorized! token invalid')
  }

  if (!email_verified) {
    res.status(400)
    throw new Error('Email not verified')
  }

  // find user in db
  const user = await AuthModel.findOne({ email }).select('-password')
  // if user already exists
  if (user) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })

    res.json({ token, successMsg: 'Logged in successfully', user })
  }

  if (!user) {
    // if user doesnot exist create new user
    const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY, {
      expiresIn: '7d',
    })

    const data = {
      fullname: name,
      email,
      picture,
      password: `${email}.${token}`,
    }

    const user = new AuthModel(data)
    await user.save()

    if (user) {
      res.json({ token, successMsg: 'Logged in successfully', user })
    }
  }
})

// CURRENT USER
// route      /api/auth/me
// access     private
// method     get
const currentUser = asyncHandler(async (req, res) => {
  const { _id, fullname, email, phoneno, picture } = await authModel.findById(
    req.user._id
  )

  res.json({
    id: _id,
    fullname,
    email,
    phoneno,
    picture,
  })
})

module.exports = {
  signup,
  signin,
  currentUser,
  activateAccount,
  forgotPassword,
  changePassword,
  googleLogin,
}
