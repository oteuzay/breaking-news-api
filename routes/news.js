const router = require("express").Router();

const newsController = require("../controllers/news");

router.get("/", newsController.getNews);
router.get("/:id");
router.post("/");
router.put("/:id");
router.delete("/:id");

module.exports = router;
