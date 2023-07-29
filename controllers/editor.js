const Editor = require("../models/editor");

const CustomError = require("../utils/errors");

/* The `getEditors` function is an async function 
that handles a GET request to retrieve all editors. */
exports.getEditors = async (req, res, next) => {
  try {
    const editors = await Editor.find();

    if (!editors) {
      throw new CustomError("Editors could not be found.", 404);
    }

    res.status(200).json({
      editors: editors.map((editor) => editor.toJSONForPreviewOfEditor()),
    });
  } catch (err) {
    next(err);
  }
};

/* The `getEditor` function is an async function 
that handles a GET request to retrieve a specific editor. */
exports.getEditor = async (req, res, next) => {
  try {
    const editor = await Editor.findById(req.params.id).populate("news");

    if (!editor) {
      throw new CustomError("Editor could not be found.", 404);
    }

    res.status(200).json({
      editor: editor,
    });
  } catch (err) {
    next(err);
  }
};
