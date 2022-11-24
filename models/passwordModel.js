const passwordValidator = require('password-validator')

const passwordSchema = new passwordValidator()

passwordSchema
  .is()
  .min(8)
  .is()
  .max(25)
  .has()
  .uppercase(1)
  .has()
  .lowercase()
  .has()
  .symbols(1)
  .has()
  .digits(2)
  .is()
  .not(/[\]()[{}<>`'"/:;,=]/) // caractére non autorisé [\]()[{}<>`'"/:;,=] puis caractére autorisé ! @ # $ % ^ & * - + . ? |
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .is()
  .not()
  .oneOf(['Password', 'Pwd', 'Password123', 'Pwd123', 'AZERTY', 'QWERTY'])

module.exports = passwordSchema
