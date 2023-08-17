const router = require("express").Router();

const newsRoute = require("./news.route");
const authRoute = require("./auth.route");
const authorRoute = require("./author.route");

router.use("/news", newsRoute);
router.use("/auth", authRoute);
router.use("/authors", authorRoute);

module.exports = router;
