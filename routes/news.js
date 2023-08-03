/**
 * @swagger
 * tags:
 *   name: News
 */
const router = require("express").Router();

const newsController = require("../controllers/news");
const isAuth = require("../middleware/is-auth");

const newsValidator = require("../validators/news");

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Fetches all news from the database
 *     tags: [News]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: int
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Internal Server Error
 */
router.get("/", newsValidator.getNews, newsController.getNews);

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a news by ID
 *     tags: [News]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", newsValidator.getNewsById, newsController.getNewsById);

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Create a news
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                  type: string
 *               content:
 *                 type: string
 *               tags:
 *                  type: Array
 *             example:
 *               title: Praesent at ipsum elit.
 *               description: Suspendisse dignissim mi ac odio viverra, et dignissim odio accumsan
 *               content: Cras quis ex congue, ultrices enim quis, porta justo. Quisque feugiat non nisl vel sagittis.
 *               tags: ["Optional Tag 1", "Optional Tag 2"]
 *     responses:
 *       201:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post("/", isAuth, newsValidator.createNews, newsController.createNews);

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update news by ID
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                  type: string
 *               content:
 *                 type: string
 *               tags:
 *                  type: Array
 *             example:
 *               title: Nullam mollis elit vitae mattis consectetur
 *               description: Donec tincidunt diam nec augue efficitur imperdiet.
 *               content: Aliquam bibendum eget lacus gravida lobortis. Cras non est turpis.
 *               tags: ["Optional Tag A", "Optional Tag B"]
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put("/:id", isAuth, newsValidator.updateNews, newsController.updateNews);

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete news by ID
 *     tags: [News]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete(
  "/:id",
  isAuth,
  newsValidator.deleteNews,
  newsController.deleteNews
);

module.exports = router;
