const passwordSchema = require("../models/passwordModel");
module.exports = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res
      .status(400)
      .json(
        "Mot de passe requis : 8 caractères minimun. Au moins 1 Majuscule, 1 minuscule, 2 chiffre, 1 caractère spécial parmi eux ! @ # $ % ^ & * - + . ? |"
      );
  } else {
    next();
  }
};
