const router = require("express").Router();

const newsController = require("../controllers/news");

router
  .route("/")
  .post(newsController.create)
  .get(newsController.read)
  .put(newsController.update)
  .delete(newsController.delete);

module.exports = router;
