const bcrypt = require("bcrypt");
const User = require("../models/User");
const generateAccessToken = require("../utils/generateAccessToken");

const loginController = async (req, res) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email });
  if (!user) {
    res.sendStatus(401); // Unknown
    return;
  }

  const passwordsMatch = bcrypt.compareSync(password, user?.password);
  if (passwordsMatch)
    res.send({
      statusCode: 200,
      accessToken: generateAccessToken(user._id),
      user: {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  else res.send({ statusCode: 403 }); // Unauthorized
};

const verifyTokenController = async (req, res) => {
  const { _id } = req.user;

  const user = await User.findById(_id);
  if (user)
    res.send({
      statusCode: 200,
      user: {
        _id: user._id,
        email: user.email,
        firstname: user.firstname,
        lastname: user.lastname,
      },
    });
  else res.send({ statusCode: 404 });
};

module.exports = {
  loginController,
  verifyTokenController,
};