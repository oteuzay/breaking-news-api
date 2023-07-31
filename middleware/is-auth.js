const jwt = require("jsonwebtoken");

const CustomError = require("../utils/errors");

require("dotenv").config();

/* The code is exporting a middleware function that is used for 
authentication in a Node.js application. */
module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    throw new CustomError("401 Unauthorized", 401);
  }

  let decodedToken;

  try {
    decodedToken = jwt.verify(authHeader.split(" ")[1], process.env.JWT_SECRET);
  } catch (err) {
    err.statusCode = 500;
    throw err;
  }

  if (!decodedToken) {
    throw new CustomError("401 Unauthorized", 401);
  }

  req.authorID = decodedToken.authorID;

  next();
};
