const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  const errorStatus = error.statusCode || 500;
  const errorMessage = error.message || "Internal Server Error";
  const errorData = error.data || {};

  res.status(errorStatus).json({
    message: errorMessage,
    data: errorData,
  });

  if (errorData === undefined) {
    logger.error(errorStatus + ": " + errorMessage);
  } else {
    logger.error(
      errorStatus + ": " + errorMessage + " " + JSON.stringify(errorData)
    );
  }
};

module.exports = errorHandler;
