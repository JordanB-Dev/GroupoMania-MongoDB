const router = require('express').Router()
const adminController = require('../controllers/adminController')
const multerPost = require('../middleware/multerPost')
const { isAuth, isAdmin } = require('../middleware/authMiddleware')

router.put('/user/:id', isAuth, isAdmin, adminController.updateUser)
router.patch('/user/:id', isAuth, isAdmin, adminController.updatePassword)
router.post('/user/:id', isAuth, isAdmin, adminController.updatePicture)
router.post('/user/ban/:id', isAuth, isAdmin, adminController.banAccound)
router.post('/user/unban/:id', isAuth, isAdmin, adminController.unBanAccound)

router.put('/post/:id', isAuth, isAdmin, multerPost, adminController.updatePost)
router.delete('/post/:id', isAuth, isAdmin, adminController.deletePost)

router.patch(
  '/comment-delete/:id',
  isAuth,
  isAdmin,
  adminController.deleteCommentPost
)

module.exports = router
