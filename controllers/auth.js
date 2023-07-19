const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Editor = require("../models/editor");

require("dotenv").config();

exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const editor = await Editor.findOne({ email: email });

    if (!editor) {
      const error = new Error("Email could not be found.");
      error.statusCode = 401;
      throw error;
    }

    const isEqual = await bcrypt.compare(password, editor.password);

    if (!isEqual) {
      const error = new Error("Wrong password!");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      {
        email: editor.email,
        userId: editor._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      email: editor.email,
      token: token,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.signup = async (req, res, next) => {
  const { name, surname, email, password } = req.body;

  try {
    const findEditor = await Editor.findOne({ email: email });

    if (findEditor) {
      const error = new Error("E-Mail address already exists!");
      error.statusCode = 422;
      throw error;
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
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};
