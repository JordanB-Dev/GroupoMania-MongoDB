const router = require('express').Router()
const postController = require('../controllers/postController')
const commentController = require('../controllers/commentController')
const multer = require('multer')
const upload = multer()

router.get('/', postController.readPost)
router.post('/', upload.single('file'), postController.createPost)
router.put('/:id', postController.updatePost)
router.delete('/:id', postController.deletePost)
router.patch('/like/:id', postController.likePost)
router.patch('/unlike/:id', postController.unlikePost)

router.patch('/comment/:id', commentController.commentPost)
router.patch('/comment-edit/:id', commentController.editCommentPost)
router.patch('/comment-delete/:id', commentController.deleteCommentPost)

module.exports = router
