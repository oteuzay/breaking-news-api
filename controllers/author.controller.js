const authorService = require("../services/author.service");

exports.getAuthors = async (req, res, next) => {
  try {
    const authors = await authorService.getAuthors();

    res.status(200).json({
      authors: authors.map((author) => author.toJSONForSummaryOfAuthor()),
    });
  } catch (err) {
    next(err);
  }
};

exports.getAuthor = async (req, res, next) => {
  try {
    const authorID = req.params.id;

    const author = await authorService.getAuthor(authorID);

    res.status(200).json({
      author: author,
    });
  } catch (err) {
    next(err);
  }
};
