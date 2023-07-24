const express = require("express");
const compression = require("compression");

const errorHandler = require("./middleware/error-handler");

const app = express();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");

app.use(express.json());
app.use(compression());

app.use("/news", newsRoutes);
app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
