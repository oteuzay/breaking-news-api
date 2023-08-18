const winston = require("winston");

const loggerConfig = require("../config/logger.config");

/* The `fileTransports` constant is an object that defines the configuration for the file transport in
the logger. It specifies the log level, the filename where the logs will be written, whether
exceptions should be handled, and the format of the log messages. */
const fileTransports = {
  level: loggerConfig.FILE.LEVEL,
  filename: loggerConfig.FILE.FILENAME,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
    winston.format.prettyPrint()
  ),
};

/* The `consoleTransports` constant is an object that defines the configuration for the console
transport in the logger. It specifies the log level, whether exceptions should be handled, and the
format of the log messages. */
const consoleTransports = {
  level: loggerConfig.CONSOLE.LEVEL,
  handleExceptions: true,
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(({ level, message, timestamp }) => {
      const ts = timestamp.slice(0, 19).replace("T", " ");
      return `${ts} [${level.toUpperCase()}]: ${message}`;
    })
  ),
};

/* The code is creating a logger object using the `winston` library. */
const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  transports: [
    new winston.transports.File(fileTransports),
    new winston.transports.Console(consoleTransports),
  ],
  exitOnError: false,
});

module.exports = logger;
