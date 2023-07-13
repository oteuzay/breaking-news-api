const express = require("express");

const app = express();

const newsRoutes = require("./routes/news");

app.use(express.json());

app.use("/", newsRoutes);

module.exports = app;
