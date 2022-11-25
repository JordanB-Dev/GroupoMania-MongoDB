const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { signUpErrors, signInErrors } = require("../utils/errorsUtils");

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: maxAge,
    }
  );
};

/*****************************************************
 ** SIGNUP
 ******************************************************/

module.exports.signUp = async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await UserModel.create({
      firstname,
      lastname,
      email,
      password,
    });
    res.status(201).json({ user: user.id });
  } catch (error) {
    const errors = signUpErrors(error);
    res.status(401).send({ errors });
  }
};

/*****************************************************
 ** LOGIN
 ******************************************************/

module.exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken({
      _id: user._id,
      lastname: user.lastname,
      firstname: user.firstname,
      email: user.email,
      isAdmin: user.isAdmin,
    });
    res.cookie("jwt", token, {
      httpOnly: true,
      sameSite: true,
      secure: true,
      maxAge,
    });
    res.status(200).json({
      user: user._id,
      isAdmin: user.isAdmin,
    });
  } catch (err) {
    const errors = signInErrors(err);
    res.status(401).json({ errors });
  }
};

/*****************************************************
 ** DECONNEXION
 ******************************************************/
module.exports.logout = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.redirect("/");
};
