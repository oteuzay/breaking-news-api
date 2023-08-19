const jsonwebtoken = require("jsonwebtoken");

const createError = require("http-errors");

const authConfig = require("../config/auth.config");

exports.signAccessToken = async (authorID) => {
  const payloads = {
    authorID: authorID,
  };

  const secret = authConfig.ACCESS_TOKEN_SECRET;

  const options = {
    expiresIn: "1h",
  };

  try {
    return jsonwebtoken.sign(payloads, secret, options);
  } catch (error) {
    throw createError.InternalServerError();
  }
};

exports.verifyAccessToken = async (req, res, next) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      throw createError.Unauthorized();
    }

    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    const secret = authConfig.ACCESS_TOKEN_SECRET;

    const payloads = await jsonwebtoken.verify(token, secret);

    req.authorID = payloads.authorID;
    next();
  } catch (error) {
    next(error);
  }
};
