const express = require("express");
const compression = require("compression");

const logger = require("./utils/logger");

const app = express();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(compression());

app.use("/", newsRoutes);
app.use("/auth", authRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;

  res.status(status).json({
    message: error.message,
    data: error.data,
  });

  logger.error(`${status} - ${error.message}`);
});

module.exports = app;
