const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Author = require("../models/author");

const { throwError } = require("../utils/errors");

const config = require("../config/config");

/* The `signin` function is responsible for handling the logic of signing in a user. */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const author = await Author.findOne({ email: email });

    if (!author) {
      throwError("EMAIL_NOT_FOUND");
    }

    const isEqual = await bcrypt.compare(password, author.password);

    if (!isEqual) {
      throwError("PASSWORD_OR_EMAIL_WRONG");
    }

    const token = jsonwebtoken.sign(
      {
        authorID: author._id.toString(),
        email: author.email,
      },
      config.SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      author: {
        authorID: author._id.toString(),
        email: author.email,
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
    const author = await Author.findOne({ email: email });

    if (author) {
      throwError("EMAIL_ALREADY_EXISTS");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await new Author({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
    }).save();

    res.status(201).json({
      message: "Author successfully created.",
      author: {
        name: name,
        surname: surname,
        email: email,
      },
    });
  } catch (err) {
    next(err);
  }
};
