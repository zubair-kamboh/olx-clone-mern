const AdModel = require('../models/adModel')
const asyncHandler = require('express-async-handler')
const AuthModel = require('../models/authModel')

// POST ADS
const postAd = asyncHandler(async (req, res) => {
  const user = req.user

  if (!req.files || req.files.length < 1) {
    throw new Error('Please include at least one image')
  }

  const filenames = req.files.map((file) => file.filename)

  const { title, description, brand, condition, location, price, category } =
    req.body

  if (
    !title ||
    !description ||
    !brand ||
    !condition ||
    !req.files ||
    !location ||
    !price ||
    !category
  ) {
    res.status(400)
    throw new Error('Please include all fields')
  }

  const data = {
    title,
    description,
    brand,
    condition,
    images: filenames,
    location,
    price,
    category,
    user: user._id,
  }

  const doc = new AdModel(data)

  await doc.save()
  if (doc) {
    res.json({ successMsg: 'Your ad has been published' })

    // add item to user array
    const updateUserItem = await AuthModel.findOneAndUpdate(
      { _id: doc.user._id },
      {
        $push: { ads: doc._id },
      }
    )
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

// GET Item User
const itemUser = asyncHandler(async (req, res) => {
  const { userId } = req.body

  const user = await AuthModel.findOne({ _id: userId })
    .select('-password')
    .select('-ads')

  if (!user) {
    res.status(404)
    throw new Error('No user found')
  }

  res.json(user)
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

  res.json({ successMsg: 'Ad deleted', id: deletedAd._id })
})

// UPDATE INDIVIDUAL AD
const updateAd = asyncHandler(async (req, res) => {
  const authUser = req.user

  const id = req.params.id

  const {
    title,
    description,
    brand,
    condition,
    images,
    location,
    price,
    category,
  } = req.body

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
      category,
    },
    { new: true }
  )

  if (!updatedAd) {
    throw new Error('Something went wrong')
  }

  res.json({ successMsg: 'Ad updated successfully', ad: updatedAd })
})

// my ads
const myads = asyncHandler(async (req, res) => {
  const user = req.user
  const ads = await AdModel.find({ user: user.id }).select(
    'title price images createdAt'
  )

  if (!ads) {
    throw new Error('Something went wrong')
  }

  res.json(ads)
})

module.exports = { postAd, getAds, updateAd, getAd, deleteAd, itemUser, myads }
