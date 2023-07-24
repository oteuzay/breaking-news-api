const jwt = require("jsonwebtoken");

const CustomError = require("../utils/errors");

require("dotenv").config();

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new CustomError("Not authenticated.", 401);
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    throw new CustomError("Not authenticated.", 401);
  }

  req.userId = decodedToken.userId;
  next();
};
