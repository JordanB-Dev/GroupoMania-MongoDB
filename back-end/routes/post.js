const router = require('express').Router()
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const { isAuth, isAdmin } = require('../middleware/authMiddleware')
const multer = require('multer')
const upload = multer()

const raterLimit = require('express-rate-limit')

const limiter = raterLimit({
  windowMs: 5 * 60 * 1000,
  max: 25,
})

router.get('/', isAuth, postController.readPost)
router.post(
  '/:id',
  isAuth,
  limiter,
  upload.single('file'),
  postController.createPost
)
router.put('/:id', isAuth, limiter, postController.updatePost)
router.delete('/:id', isAuth, limiter, postController.deletePost)
router.patch('/like/:id', isAuth, postController.likePost)
router.patch('/unlike/:id', isAuth, postController.unlikePost)

router.patch('/comment/:id', isAuth, limiter, commentController.commentPost)
router.patch('/comment-edit/:id', isAuth, commentController.editCommentPost)
router.patch('/comment-delete/:id', isAuth, commentController.deleteCommentPost)

module.exports = router
