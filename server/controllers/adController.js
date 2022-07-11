const AdModel = require('../models/adModel')
const asyncHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')

// POST ADS
const postAd = asyncHandler(async (req, res) => {
  const user = req.user
  // return
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
    user: user._id,
  }

  const doc = new AdModel(data)

  await doc.save()
  if (doc) {
    res.json(doc)

    // add item to user array
    const updateUserItem = await AuthModel.findOneAndUpdate(
      { _id: doc.user._id },
      {
        $push: { ads: doc._id },
      }
    )

    console.log(updateUserItem)
  } else {
    throw new Error('could not save your ad')
  }
})

// GET ADS
const getAds = asyncHandler(async (req, res) => {
  const ads = await AdModel.find({}).populate({
    path: 'user',
    select: '-password',
  })

  if (!ads) {
    res.status(404)
    throw new Error('No ads data to show')
  }

  res.json(ads)
})

// GET INDIVIDUAL AD
const getAd = asyncHandler(async (req, res) => {
  const id = req.params.id
  const ad = await AdModel.findOne({ _id: id }).populate({
    path: 'user',
    select: '-password',
  })

  if (!ad) {
    res.status(404)
    throw new Error('No item found')
  }

  res.json(ad)
})

// DELETE INDIVIDUAL AD
const deleteAd = asyncHandler(async (req, res) => {
  const authUser = req.user

  const id = req.params.id

  // check if user is authorized to delete this ad
  const ad = await AdModel.findOne({ _id: id }).select('user')

  if (ad.user._id.toString() !== authUser.id) {
    res.status(401)
    throw new Error('Not authorized! cant delete this ad')
  }

  // delete
  const deletedAd = await AdModel.findByIdAndRemove(id)

  if (!deletedAd) {
    res.status(404)
    throw new Error('No item found! Cannot delete this item')
  }

  res.json({ message: 'Ad deleted' })
})

// UPDATE INDIVIDUAL AD
const updateAd = asyncHandler(async (req, res) => {
  const authUser = req.user

  const id = req.params.id
  const { title, description, brand, condition, images, location, price } =
    req.body

  // check if user is authorized to delete this ad
  const ad = await AdModel.findOne({ _id: id }).select('user')

  if (ad.user._id.toString() !== authUser.id) {
    res.status(401)
    throw new Error('Not authorized! cant update this ad')
  }

  // update
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
