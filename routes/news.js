const router = require("express").Router();

const newsController = require("../controllers/news");

router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);
router.post("/", newsController.createNews);
router.put("/:id");
router.delete("/:id");

module.exports = router;
