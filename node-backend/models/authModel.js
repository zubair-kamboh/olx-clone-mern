const mongoose = require('mongoose')

const AuthSchema = new mongoose.Schema({
  fullname: {
    type: String,
    maxLength: 64,
    required: true,
  },
  phoneno: {
    type: Number,
    min: 10000000000,
    max: 99999999999,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
})

module.exports = mongoose.model('authModel', AuthSchema)
