const express = require('express')
const userRoutes = require('./routes/user')
const postRoutes = require('./routes/post')
const adminRoutes = require('./routes/admin')
const helmet = require('helmet')
const cookieParser = require('cookie-parser')
const path = require('path')
require('dotenv').config({ path: '.env' })
require('./config/database')
const { checkUser, isAuth } = require('./middleware/authMiddleware')
const cors = require('cors')
const app = express()

const corsOptions = {
  origin: process.env.URL,
  credentials: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
}
app.use(cors(corsOptions))

app.use(helmet())
app.use(helmet.xssFilter())
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

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())

app.get('*', checkUser)
app.get('/jwtid', isAuth, (req, res) => {
  res.status(200).json(res.locals.user._id)
})

app.use('/images', express.static(path.join(__dirname, 'images')))
app.use(express.static('images'))

app.use('/api/user', userRoutes)
app.use('/api/post', postRoutes)
app.use('/api/admin', adminRoutes)

module.exports = app
