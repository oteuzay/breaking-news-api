const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const Author = require("../models/author");

const CustomError = require("../utils/errors");

require("dotenv").config();

/* The `signin` function is responsible for handling the logic of signing in a user. */
exports.signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const author = await Author.findOne({ email: email });

    if (!author) {
      throw new CustomError("Email could not be found.", 404);
    }

    const isEqual = await bcrypt.compare(password, author.password);

    if (!isEqual) {
      throw new CustomError("Password is wrong.", 401);
    }

    const token = jwt.sign(
      {
        authorID: author._id.toString(),
        email: author.email,
      },
      process.env.JWT_SECRET,
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
      throw new CustomError("E-Mail address already exists!", 422);
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
