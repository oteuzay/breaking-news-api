const { body, check, query } = require("express-validator");

const validationCheck = require("../middleware/validation-check.middleware");

exports.getNews = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];

exports.createNews = [
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long.")
    .isString()
    .withMessage("Description must be a string."),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long.")
    .isString()
    .withMessage("Content must be a string."),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array.")
    .custom((tags) => {
      if (!tags.every((tag) => typeof tag === "string")) {
        throw new Error("All tags must be strings.");
      }
      return true;
    }),
  validationCheck,
];

exports.getNewsById = [
  check("id")
    .isMongoId()
    .withMessage("Invalid news ID. The ID should be a valid MongoDB ObjectID."),
  validationCheck,
];

exports.updateNews = [
  check("id")
    .isMongoId()
    .withMessage("Invalid news ID. The ID should be a valid MongoDB ObjectID."),
  body("title")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Title must be at least 5 characters long.")
    .isString()
    .withMessage("Title must be a string."),
  body("description")
    .trim()
    .isLength({ min: 10 })
    .withMessage("Description must be at least 10 characters long.")
    .isString()
    .withMessage("Description must be a string."),
  body("content")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Content must be at least 5 characters long.")
    .isString()
    .withMessage("Content must be a string."),
  body("tags")
    .optional()
    .isArray()
    .withMessage("Tags must be an array.")
    .custom((tags) => {
      if (!tags.every((tag) => typeof tag === "string")) {
        throw new Error("All tags must be strings.");
      }
      return true;
    }),
  validationCheck,
];

exports.deleteNews = [
  check("id")
    .isMongoId()
    .withMessage("Invalid news ID. The ID should be a valid MongoDB ObjectID."),
  validationCheck,
];
