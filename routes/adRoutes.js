const express = require('express')
const { multerMiddleware, upload } = require('../config/multer')
const {
  postAd,
  getAds,
  updateAd,
  getAd,
  deleteAd,
  itemUser,
  myads,
} = require('../controllers/adController')
const authUser = require('../middlewares/authUser.js')
const router = require('express').Router()

router.post('/post', authUser, upload, multerMiddleware, postAd)
router.get('/items', getAds)
router.post('/item/user', itemUser)
router.get('/item/:id', getAd)
router.put('/item/update/:id', authUser, upload, multerMiddleware, updateAd)
router.delete('/item/delete/:id', authUser, deleteAd)
router.get('/myads', authUser, myads)

module.exports = router
