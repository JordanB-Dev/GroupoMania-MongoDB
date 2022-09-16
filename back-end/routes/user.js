const router = require('express').Router()
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadController')
const multer = require('multer')
const upload = multer()

const raterLimit = require('express-rate-limit')

const limiter = raterLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
})

router.post('/register', authController.signUp)
router.post('/login', limiter, authController.signIn)
router.get('/logout', authController.logout)

router.get('/', userController.getAllUsers)
router.get('/:id', userController.getOneUser)
router.put('/:id', userController.updateUser)
router.delete('/:id', userController.deleteUser)

router.post('/upload', upload.single('file'), uploadController.uploadProfil)

module.exports = router
