const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const { uploadErrors } = require('../utils/errorsUtils')
const sharp = require('sharp')

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('Error to get data : ' + err)
  }).sort({ createdAt: -1 })
}

module.exports.createPost = async (req, res) => {
  if (req.params.id !== req.user._id) {
    return res.status(403).json('unauthorized request')
  }
  let fileName
  try {
    if (
      req.file.mimetype != 'image/jpg' &&
      req.file.mimetype != 'image/png' &&
      req.file.mimetype != 'image/jpeg'
    )
      throw Error('invalid file')

    if (req.file.size > 500000) throw Error('max size')
  } catch (err) {
    const errors = uploadErrors(err)
    return res.status(201).json({ errors })
  }
  fileName = req.body.posterId + Date.now() + '.jpg'

  try {
    await sharp(req.file.buffer).toFile(
      `${__dirname}/../images/uploads/posts/${fileName}`
    )
    res.status(201).send('Photo post uploaded successfully')
  } catch (err) {
    res.status(400)
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    lastname: req.user.lastname,
    firstname: req.user.firstname,
    message: req.body.message,
    picture: req.file != null ? './uploads/posts/' + fileName : '',
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

module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  const updatedRecord = {
    message: req.body.message,
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
