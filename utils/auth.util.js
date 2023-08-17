const jsonwebtoken = require("jsonwebtoken");

const createError = require("http-errors");

const apiConfig = require("../config/api.config");

exports.signAccessToken = async (authorID) => {
  const payloads = {
    authorID: authorID,
  };

  const secret = apiConfig.SECRET;

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
    const secret = apiConfig.SECRET;

    const payloads = await jsonwebtoken.verify(token, secret);

    req.authorID = payloads.authorID;
    next();
  } catch (error) {
    next(error);
  }
};
