const router = require('express').Router()
const raterLimit = require('express-rate-limit')
const authController = require('../controllers/authController')
const userController = require('../controllers/userController')
const uploadController = require('../controllers/uploadController')
const pwdCtrl = require('../middleware/passwordMiddleware')
const { isAuth } = require('../middleware/authMiddleware')
const multer = require('multer')
const upload = multer()

const limiter = raterLimit({
  windowMs: 5 * 60 * 1000,
  max: 25,
})

router.post('/register', pwdCtrl, authController.signUp)
router.post('/login', limiter, authController.signIn)
router.get('/logout', authController.logout)

router.get('/', isAuth, userController.getAllUsers)
router.get('/:id', isAuth, userController.getOneUser)
router.put('/:id', isAuth, limiter, userController.updateUser)
router.delete('/:id', isAuth, userController.deleteUser)

router.post(
  '/upload',
  isAuth,
  upload.single('file'),
  uploadController.uploadProfil
)

module.exports = router
