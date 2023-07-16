const router = require("express").Router();

const newsController = require("../controllers/news");
const isAuth = require("../middleware/is-auth");

// GET
router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);

// POST
router.post("/", isAuth, newsController.createNews);

// PUT
router.put("/:id", isAuth, newsController.updateNews);

// DELETE
router.delete("/:id", isAuth, newsController.deleteNews);

module.exports = router;
