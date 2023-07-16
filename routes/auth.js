const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

// GET
router.post("/login", authController.login);

// POST
router.post("/signup", authController.signup);

module.exports = router;
