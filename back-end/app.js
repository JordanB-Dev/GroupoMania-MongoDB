const express = require('express')
const helmet = require('helmet')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config({ path: '.env' })

const app = express()

app.use(helmet())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `${process.env.URL}`)
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  )
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  )
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  res.setHeader('Cross-Origin-Resource-Policy', 'same-site')
  next()
})

app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static('images'))

module.exports = app
