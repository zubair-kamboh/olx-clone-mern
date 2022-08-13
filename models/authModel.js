const mongoose = require('mongoose')
const { Schema } = mongoose
const AuthSchema = new Schema(
  {
    fullname: {
      type: String,
      maxLength: 64,
      required: true,
    },
    phoneno: {
      type: Number,
    },
    picture: {
      type: String,
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 8,
    },
    ads: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Ads',
      },
    ],
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', AuthSchema)
