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
const mainRoutes = require("./routes/main.route");

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

app.use("/", mainRoutes);

app.use(errors);

module.exports = app;
