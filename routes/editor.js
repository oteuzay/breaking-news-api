const router = require("express").Router();

const editorController = require("../controllers/editor");

// GET
router.get("/", editorController.getEditors);
router.get("/:id", editorController.getEditor);

module.exports = router;
