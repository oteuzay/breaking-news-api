const express = require("express");

const app = express();

const newsRoutes = require("./routes/news");

app.use(express.json());

app.use("/", newsRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;

  res.status(status).json({
    message: error.message,
    data: error.data,
  });
});

module.exports = app;
