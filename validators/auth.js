const { body } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.signup = [
  body("name").trim().notEmpty().withMessage("Name field should not be empty."),
  body("surname")
    .trim()
    .notEmpty()
    .withMessage("Surname field should not be empty."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  validationCheck,
];

exports.signin = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email.")
    .normalizeEmail(),
  body("password")
    .trim()
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long."),
  validationCheck,
];
