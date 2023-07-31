const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const compression = require("compression");

const errors = require("./middleware/error-handler");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

const app = express();

const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const editorRoutes = require("./routes/editor");

app.use(
  cors({
    origin: process.env.ALLOWED_ORIGIN,
  })
);

app.use(helmet());

app.use(express.json());
app.use(compression());

if (process.env.NODE_ENV == "Development") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

app.use("/auth", authRoutes);

app.use("/news", newsRoutes);
app.use("/editors", editorRoutes);

app.use(errors);

module.exports = app;
