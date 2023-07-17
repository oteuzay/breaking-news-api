const router = require("express").Router();

const newsController = require("../controllers/news");
const isAuth = require("../middleware/is-auth");

const newsValidator = require("../validators/news");

// GET
router.get("/", newsController.getNews);
router.get("/:id", newsController.getNewsById);

// POST
router.post("/", isAuth, newsValidator.createNews, newsController.createNews);

// PUT
router.put("/:id", isAuth, newsValidator.updateNews, newsController.updateNews);

// DELETE
router.delete("/:id", isAuth, newsController.deleteNews);

module.exports = router;
