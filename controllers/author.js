const Author = require("../models/author");

const CustomError = require("../utils/errors");

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find();

    if (!authors) {
      throw new CustomError("Author could not be found.", 404);
    }

    res.status(200).json({
      authors: authors.map((author) => author.toJSONForSummaryOfAuthor()),
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const author = await Author.findById(req.params.id).populate("news");

    if (!author) {
      throw new CustomError("Author could not be found.", 404);
    }

    res.status(200).json({
      author: author,
    });
  } catch (err) {
    next(err);
  }
};
