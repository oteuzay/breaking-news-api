const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const compression = require("compression");

const errors = require("./middleware/error-handler");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

const config = require("./config/config");

const app = express();

/*
 * Routes
 */
const newsRoutes = require("./routes/news");
const authRoutes = require("./routes/auth");
const authorRoutes = require("./routes/author");

app.use(
  cors({
    origin: config.ALLOWED_ORIGIN,
  })
);

app.use(helmet());

app.use(express.json());
app.use(compression());

if (config.NODE_ENV == "Development") {
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

app.use("/auth", authRoutes);

app.use("/news", newsRoutes);
app.use("/authors", authorRoutes);

app.use(errors);

module.exports = app;
