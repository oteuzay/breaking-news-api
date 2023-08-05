const { body, check, query } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

const validateCommonFields = [
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
    .isLength({ min: 20 })
    .withMessage("Content must be at least 20 characters long.")
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
];

const validateId = [
  check("id")
    .isMongoId()
    .withMessage("Invalid news ID. The ID should be a valid MongoDB ObjectID."),
];

exports.getNews = [
  check("page")
    .optional()
    .isInt({ min: 1 })
    .withMessage(
      "Page must be a positive integer and greater than or equal to 1."
    ),
  validationCheck,
];

exports.createNews = [...validateCommonFields, validationCheck];

exports.updateNews = [...validateCommonFields, validationCheck];

exports.getNewsById = [...validateId, validationCheck];

exports.deleteNews = [...validateId, validationCheck];
