const { default: mongoose } = require('mongoose')
require('../models/adModel')
require('../models/authModel')

const connection = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
    })

    if (connection) {
      console.log('db connected')
    }
  } catch (e) {
    console.log(e)
  }
}

module.exports = connection
