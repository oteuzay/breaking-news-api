/**
 * @swagger
 * tags:
 *   name: Author
 */
const router = require("express").Router();

const authorController = require("../controllers/author");

const authorValidator = require("../validators/author");

/**
 * @swagger
 * /authors:
 *   get:
 *     description: Fetches all authors from the database.
 *     tags: [Author]
 *     responses:
 *       200:
 *         description: Success
 *       500:
 *         description: Server Error
 */
router.get("/", authorController.getAuthors);

/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     description: Fetches a single author by their ID along with their news.
 *     tags: [Author]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the author to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *          description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get("/:id", authorValidator.getAuthor, authorController.getAuthor);

module.exports = router;
