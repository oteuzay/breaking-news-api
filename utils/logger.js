const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "logs/errors.log",
    }),
  ],
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
