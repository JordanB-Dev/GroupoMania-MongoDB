const router = require('express').Router()
const adminController = require('../controllers/adminController')
const multerPost = require('../middleware/multerPost')
const { isAuth, isAdmin } = require('../middleware/authMiddleware')

const raterLimit = require('express-rate-limit')

const limiter = raterLimit({
  windowMs: 5 * 60 * 1000,
  max: 25,
})

router.put(
  '/post/:id',
  isAuth,
  isAdmin,
  multerPost,
  limiter,
  adminController.updatePost
)
router.delete('/post/:id', isAuth, isAdmin, limiter, adminController.deletePost)

router.patch(
  '/comment-delete/:id',
  isAuth,
  isAdmin,
  adminController.deleteCommentPost
)

module.exports = router
