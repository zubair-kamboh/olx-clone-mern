const express = require('express')
require('dotenv').config()
const connection = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const cors = require('cors')

const port = process.env.PORT || 8000

// body parser middlewares
app.use(express.json())
app.use(
  express.urlencoded({
    extended: true,
  })
)

// cors
app.use(cors())

// router
app.use('/api', require('./routes/adRoutes'))
app.use('/api/auth', require('./routes/authRoutes'))

// error handler
app.use(errorHandler)

// db connection
connection()

const server = app.listen(port, () => console.log(`Server running on ${port}`))
