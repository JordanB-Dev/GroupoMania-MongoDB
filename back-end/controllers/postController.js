const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId

/*****************************************************
 ** READPOST AFFICHE TOUT LES POST
 ******************************************************/
module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) res.send(docs)
    else console.log('Error to get data : ' + err)
  }).sort({ createdAt: -1 })
}

/*****************************************************
 ** CREATEPOST CREE UN POST
 ******************************************************/
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

/*****************************************************
 ** UPDATEPOST MODIFIER UN POST
 ******************************************************/
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

/*****************************************************
 ** DELETEPOST SUPPRIMER UN POST
 ******************************************************/
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

/*****************************************************
 ** LIKEPOST AIMER UN POST
 ******************************************************/
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

/*****************************************************
 ** UNLIKEPOST RETIRER SON JAIME DUN POST
 ******************************************************/
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
