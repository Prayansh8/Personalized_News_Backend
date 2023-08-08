const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const isAuthenticatedUser = async (req, res, next) => {
  try {
    const token = req.headers["authorization"];

    if (!token) {
      return res.status(400).json("user auth unSuccessfull");
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).send(err);
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(400).json("Please SignIn!");
  }
};

module.exports = { isAuthenticatedUser };
