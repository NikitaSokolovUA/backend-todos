const jwt = require("jsonwebtoken");
const { Auth } = require("../models/auth");

const authByToken = async (req, res, next) => {
  try {
    const headerAuth = req.headers.authorization || "";
    const [type, token] = headerAuth.split(" ");

    if (type !== "Bearer") {
      return res.status(401).json({ message: "Token type is invalid " });
    }

    if (!token) {
      return res.status(401).json({ message: "Token is not valid " });
    }

    try {
      const { id } = jwt.verify(token, process.env.JWT_CODE);
      const user = await Auth.findById(id);

      req.user = user;
    } catch (error) {
      if (
        error.name === "TokenExpiredError" ||
        error.name === "JsonWebTokenError"
      ) {
        return res.status(401).json({ message: "No token provided" });
      }
      throw error;
    }

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { authByToken };
