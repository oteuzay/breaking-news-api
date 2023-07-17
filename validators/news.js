const { body } = require("express-validator");

const validationCheck = require("../middleware/validation-check");

exports.createNews = [
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 10 }),
  validationCheck,
];

exports.updateNews = [
  body("title").trim().isLength({ min: 5 }),
  body("content").trim().isLength({ min: 10 }),
  validationCheck,
];
