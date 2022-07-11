const express = require('express')
const router = require('express').Router()

const {
  signup,
  signin,
  currentUser,
  activateAccount,
  forgotPassword,
  changePassword,
  googleLogin,
} = require('../controllers/authController')
const authUser = require('../middlewares/authUser')

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/me', authUser, currentUser)
router.post('/activate', activateAccount)
router.post('/forget', forgotPassword)
router.put('/change-password', changePassword)
router.post('/googlelogin', googleLogin)

module.exports = router
