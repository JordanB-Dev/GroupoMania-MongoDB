const UserModel = require('../models/userModel')
const sharp = require('sharp')
const { uploadErrors } = require('../utils/errorsUtils')

module.exports.uploadProfil = async (req, res) => {
  const fileName = req.body.name + '.jpg'
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

  try {
    await sharp(req.file.buffer)
      .resize({ width: 150, height: 150 })
      .toFile(`${__dirname}/../images/uploads/profil/${fileName}`)
    res.status(201).send('Photo de profil chargé avec succés')
  } catch (err) {
    res.status(400).send(err)
  }

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `${req.protocol}://${req.get(
            'host'
          )}/images/uploads/profil/${fileName}`,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((data) => res.send(data))
      .catch((err) => res.status(500).send({ message: err }))
  } catch (err) {
    return res.status(500)
  }
}
