const express = require("express");
const compression = require("compression");

const errorHandler = require("./middleware/error-handler");

const app = express();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const editorRoutes = require("./routes/editor");

app.use(express.json());
app.use(compression());

app.use("/auth", authRoutes);

app.use("/news", newsRoutes);
app.use("/editor", editorRoutes);

app.use(errorHandler);

module.exports = app;
