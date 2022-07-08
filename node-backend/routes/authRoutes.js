const express = require('express')
const router = require('express').Router()

const { signup, signin } = require('../controllers/authController')

router.post('/signup', signup)
router.post('/signin', signin)

module.exports = router
