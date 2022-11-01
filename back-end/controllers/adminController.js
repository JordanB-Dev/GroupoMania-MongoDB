const PostModel = require('../models/postModel')
const UserModel = require('../models/userModel')
const ObjectID = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')

/*****************************************************
 ** UPDATEUSER MODIFIER FIRSTNAME? LASTNAME...
 ******************************************************/
module.exports.updateUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    const { firstname, lastname, email, bio } = req.body

    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          firstname: firstname,
          lastname: lastname,
          email: email,
          bio: bio,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** UPDATEPASSWORD MODIFIER MOT DE PASSE
 ******************************************************/
module.exports.updatePassword = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    const hashedPwd = await bcrypt.hash(req.body.password, 10)

    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          password: hashedPwd,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** UPDATEPICTURE MODIFIER PHOTO DE PROFIL
 ******************************************************/
module.exports.updatePicture = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          picture: './uploads/profil/default/random-user.png',
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** BANACCOUND BANNIR UN UTILISATEUR
 ******************************************************/
module.exports.banAccound = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isBan: true,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** UNBANACCOUND DEBANNIR UN UTILISATEUR
 ******************************************************/
module.exports.unBanAccound = async (req, res) => {
  if (!ObjectID.isValid(req.params.id))
    return res.status(400).send('ID unknown : ' + req.params.id)

  try {
    await UserModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          isBan: false,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500).json({ message: err })
  }
}

/*****************************************************
 ** UPDATEPOST MODIFIER UN POST
 ******************************************************/
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

/*****************************************************
 ** DELETEPOST SUPPRIMER UN POST
 ******************************************************/
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
