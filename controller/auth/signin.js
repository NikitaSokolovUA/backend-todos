const { Auth } = require("../../models/auth");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const { JWT_CODE } = process.env;

    const user = await Auth.findOne({ email }).exec();
    const isComparePassword = await bcrypt.compare(password, user.password);

    if (!isComparePassword) {
      return res
        .status(401)
        .json({ message: "Email or passwors is not valid" });
    }

    const token = jwt.sign({ id: user._id }, JWT_CODE, { expiresIn: "7d" });

    res.json({
      email: user.email,
      username: user.username,
      subscription: user.subscription,
      token,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { signIn };
