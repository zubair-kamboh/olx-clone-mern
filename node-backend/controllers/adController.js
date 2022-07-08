const AdModel = require('../models/adModel')
const asyncHandler = require('express-async-handler')

// POST ADS
const postAd = asyncHandler(async (req, res) => {
  const { title, description, brand, condition, images, location, price } =
    req.body

  if (
    !title ||
    !description ||
    !brand ||
    !condition ||
    !images ||
    !location ||
    !price
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const data = {
    title,
    description,
    brand,
    condition,
    images,
    location,
    price,
  }

  const doc = new AdModel(data)
  await doc.save()
  if (doc) {
    console.log(doc)
    res.json(doc)
  } else {
    throw new Error('could not save your ad')
  }
})

// GET ADS
const getAds = asyncHandler(async (req, res) => {
  const ads = await AdModel.find({})

  if (!ads) {
    res.status(404)
    throw new Error('No ads data to show')
  }

  res.json(ads)
})

// GET INDIVIDUAL AD
const getAd = asyncHandler(async (req, res) => {
  const id = req.params.id
  const ad = await AdModel.findOne({ _id: id })

  if (!ad) {
    res.status(404)
    throw new Error('No item found')
  }

  res.json(ad)
})

// DELETE INDIVIDUAL AD
const deleteAd = asyncHandler(async (req, res) => {
  const id = req.params.id
  const deletedAd = await AdModel.findByIdAndRemove(id)

  if (!deleteAd) {
    res.status(404)
    throw new Error('No item found! Cannot delete this item')
  }

  res.json({ message: 'Ad deleted' })
})

// UPDATE INDIVIDUAL AD
const updateAd = asyncHandler(async (req, res) => {
  const id = req.params.id
  const { title, description, brand, condition, images, location, price } =
    req.body

  const updatedAd = await AdModel.findByIdAndUpdate(
    id,
    {
      title,
      description,
      brand,
      condition,
      images,
      location,
      price,
    },
    { new: true }
  )

  if (!updatedAd) {
    res.status(400)
    throw new Error('ad could not updated')
  }

  res.json(updatedAd)
})

module.exports = { postAd, getAds, updateAd, getAd, deleteAd }
