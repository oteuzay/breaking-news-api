const winston = require("winston");

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File({
      level: "error",
      filename: "./logs/errors.log",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint()
      ),
    }),
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp }) => {
          const ts = timestamp.slice(0, 19).replace("T", " ");
          return `${ts} [${level.toUpperCase()}]: ${message}`;
        })
      ),
    }),
  ],
  exitOnError: false,
});

module.exports = logger;
