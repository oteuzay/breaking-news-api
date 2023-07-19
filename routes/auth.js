const express = require("express");

const authController = require("../controllers/auth");
const authValidator = require("../validators/auth");

const router = express.Router();

// POST
router.post("/signin", authValidator.signin, authController.signin);
router.post("/signup", authValidator.signup, authController.signup);

module.exports = router;
