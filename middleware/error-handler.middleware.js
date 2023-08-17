const logger = require("../utils/logger");

module.exports = (error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";

  res.status(errorStatus).json({
    message: errorMessage,
  });

  logger.error(errorStatus + ": " + errorMessage);
};
