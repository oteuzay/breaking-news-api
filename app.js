const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const compression = require("compression");

const errorHandler = require("./middleware/error-handler");

const app = express();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const editorRoutes = require("./routes/editor");

app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(compression());

app.use("/auth", authRoutes);

app.use("/news", newsRoutes);
app.use("/editors", editorRoutes);

app.use(errorHandler);

module.exports = app;
