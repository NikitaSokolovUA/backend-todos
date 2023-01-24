const { Auth } = require("../../models/auth");
const bcrypt = require("bcrypt");
const { Conflict } = require("http-errors");
const jwt = require("jsonwebtoken");

const signUp = async (req, res, next) => {
  try {
    const { password } = req.body;
    const { JWT_CODE } = process.env;

    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);

    const newUser = await Auth.create({ ...req.body, password: cryptPassword });
    const token = jwt.sign({ id: newUser._id }, JWT_CODE, { expiresIn: "7d" });

    res.status(201).json({
      user: {
        email: newUser.email,
        username: newUser.username,
        subscription: newUser.subscription,
        token,
      },
    });
  } catch (error) {
    console.log("Massage: ", error.message);
    console.log("Name: ", error.name);

    if (error.message.includes("E11000 duplicate key error collection")) {
      throw next(Conflict("Email is already use"));
    }

    next(error);
  }
};

module.exports = { signUp };
