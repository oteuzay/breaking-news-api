const router = require("express").Router();

const config = require("../config/api.config");

const newsRoute = require("./news.route");
const authRoute = require("./auth.route");
const authorRoute = require("./author.route");

const swaggerUI = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

if (config.NODE_ENV === "Development") {
  router.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));
}

router.use("/news", newsRoute);
router.use("/auth", authRoute);
router.use("/authors", authorRoute);

module.exports = router;
