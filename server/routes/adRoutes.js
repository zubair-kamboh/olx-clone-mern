const express = require('express')
const { multerMiddleware, upload } = require('../config/multer')
const {
  postAd,
  getAds,
  updateAd,
  getAd,
  deleteAd,
  itemUser,
} = require('../controllers/adController')
const authUser = require('../middlewares/authUser.js')
const router = require('express').Router()

router.post('/post', authUser, upload, multerMiddleware, postAd)
router.get('/items', getAds)
router.get('/item/user', itemUser)
router.get('/item/:id', getAd)
router.put('/item/update/:id', authUser, updateAd)
router.delete('/item/delete/:id', authUser, deleteAd)

module.exports = router
