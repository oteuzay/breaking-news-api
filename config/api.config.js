require("dotenv").config();

/* The code is exporting an object with several properties. Each property is assigned a value from the
corresponding environment variable using `process.env`. */
module.exports = {
  PORT: process.env.PORT || 8080,
  ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN | "*",
  NODE_ENV: process.env.NODE_ENV || "Development",
  LOCALE: process.env.LOCALE,
};
