const { check } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.getAuthor = [
  check("id")
    .trim()
    .notEmpty()
    .withMessage("Author ID cannot be empty.")
    .isMongoId()
    .withMessage("Invalid Author ID format."),
  validationCheck,
];
