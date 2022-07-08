const express = require('express')
const {
  postAd,
  getAds,
  updateAd,
  getAd,
  deleteAd,
} = require('../controllers/adController')
const router = require('express').Router()

router.post('/post', postAd)
router.get('/items', getAds)
router.get('/item/:id', getAd)
router.put('/item/update/:id', updateAd)
router.delete('/item/delete/:id', deleteAd)

module.exports = router
