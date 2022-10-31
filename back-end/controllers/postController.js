const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('Error to get data : ' + err)
  }).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
  let imageUrl
  if (req.file) {
    imageUrl = `./uploads/posts/${req.file.filename}`
  } else {
    picture = null
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: imageUrl,
    video: req.body.video,
    likers: [],
    comments: [],
  })

  try {
    const post = await newPost.save()
    return res.status(201).json(post)
  } catch (err) {
    return res.status(400)
  }
}

module.exports.updatePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)
  if (req.body.posterId && req.body.posterId !== req.user._id) {
    return res.status(403).json('unauthorized request')
  }

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
  if (req.body.posterId && req.body.posterId !== req.user._id) {
    return res.status(403).json('unauthorized request')
  }

  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) res.send(docs)
    else console.log('Delete error : ' + err)
  })
}

module.exports.likePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $addToSet: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))

    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $addToSet: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(400)
  }
}

module.exports.unlikePost = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: { likers: req.body.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
    await UserModel.findByIdAndUpdate(
      req.body.id,
      {
        $pull: { likes: req.params.id },
      },
      { new: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(200)
  }
}
