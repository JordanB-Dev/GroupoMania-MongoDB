const PostModel = require('../models/postModel')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  let newImageUrl

  if (req.file) {
    newImageUrl = `./uploads/posts/${req.file.filename}`
  }

  if (newImageUrl && req.picture) {
    req.picture.split(`${__dirname}/../../front-end/public/uploads/posts/`)[1]
  }

  const updatedRecord = {
    message: req.body.message,
    picture: newImageUrl,
  }

  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) res.send(docs)
      else console.log('Update error : ' + err)
    }
  )
}

module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('Delete error : ' + err)
  })
}

module.exports.deleteCommentPost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(400).send(err)
  }
}
