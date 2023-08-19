const router = require("express").Router();

const newsRoute = require("./news.route");
const authRoute = require("./auth.route");
const authorRoute = require("./author.route");

const swaggerRoute = require("./swagger.route");

router.use("/api-docs", swaggerRoute);

router.use("/news", newsRoute);
router.use("/auth", authRoute);
router.use("/authors", authorRoute);

module.exports = router;
