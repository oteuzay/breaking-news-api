const logger = require("../utils/logger");

const errorHandler = (error, req, res, next) => {
  const status = error.statusCode || 500;

  res.status(status).json({
    message: error.message,
    data: error.data || {},
  });

  if (error.data === undefined) {
    logger.error(status + ": " + error.message);
  } else {
    logger.error(
      status + ": " + error.message + " " + JSON.stringify(error.data)
    );
  }
};

module.exports = errorHandler;
