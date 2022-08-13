const { default: mongoose } = require('mongoose')

const connection = () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log('connected to db'))
      .catch((e) => console.log(e))
  } catch (e) {
    console.log(e)
  }
}

module.exports = connection
