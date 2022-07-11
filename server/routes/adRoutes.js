const express = require('express')
const {
  postAd,
  getAds,
  updateAd,
  getAd,
  deleteAd,
} = require('../controllers/adController')
const authUser = require('../middlewares/authUser.js')
const router = require('express').Router()

router.post('/post', authUser, postAd)
router.get('/items', getAds)
router.get('/item/:id', getAd)
router.put('/item/update/:id', authUser, updateAd)
router.delete('/item/delete/:id', authUser, deleteAd)

module.exports = router
