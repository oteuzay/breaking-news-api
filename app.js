const express = require("express");

const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const createError = require("http-errors");

const apiConfig = require("./config/api.config");

const mainRoutes = require("./routes/main.route");
const errorHandler = require("./middleware/error-handler.middleware");

const app = express();

app.use(
  cors({
    origin: apiConfig.ALLOWED_ORIGIN,
  })
);

app.use(helmet());
app.use(express.json());
app.use(compression());

app.use("/", mainRoutes);

app.use(async (req, res, next) => {
  next(createError.NotFound());
});

app.use(errorHandler);

module.exports = app;
