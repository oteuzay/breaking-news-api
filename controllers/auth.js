const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Editor = require("../models/editor");

require("dotenv").config();

/* The `signin` function is responsible for handling the logic of signing in a user. */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const editor = await Editor.findOne({ email: email });

    if (!editor) {
      throw new CustomError("Email could not be found.", 404);
    }

    const isEqual = await bcrypt.compare(password, editor.password);

    if (!isEqual) {
      throw new CustomError("Password is wrong.", 401);
    }

    const token = jwt.sign(
      {
        editorID: editor._id.toString(),
        email: editor.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      editor: {
        editorID: editor._id.toString(),
        email: editor.email,
      },
      token: token,
    });
  } catch (err) {
    next(err);
  }
};

/* The `signup` function is responsible for handling the logic of signing up a new user. */
exports.signup = async (req, res, next) => {
  const { name, surname, email, password } = req.body;

  try {
    const editor = await Editor.findOne({ email: email });

    if (editor) {
      throw new CustomError("E-Mail address already exists!", 422);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await new Editor({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "Editor successfully created.",
      editor: {
        name: name,
        surname: surname,
        email: email,
      },
    });
  } catch (err) {
    next(err);
  }
};
