const News = require("../models/news");
const Author = require("../models/author");

const CustomError = require("../utils/errors");

/* The `createNews` function is responsible for creating a new news. */
exports.createNews = async (req, res, next) => {
  try {
    const news = await News({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
      authorID: req.authorID,
    }).save();

    await Author.findByIdAndUpdate(req.authorID, {
      $push: { news },
    });

    res.status(201).json({
      message: "News successfully created.",
      news: news,
    });
  } catch (err) {
    next(err);
  }
};

/* The `getNews` function is responsible for retrieving a list of news. */
exports.getNews = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const countNews = await News.find().countDocuments();

    const news = await News.find()
      .populate("authorID")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      news: news.map((news) => news.toJSONForSummaryOfNews()),
      pagination: {
        currentPage: currentPage,
        lastPage: Math.ceil(countNews / perPage),
        countNews: countNews,
      },
    });
  } catch (err) {
    next(err);
  }
};

/* The `getNewsById` function is responsible for retrieving a specific news item by its ID. It uses the
`News` model to find the news item with the specified ID and populates the `authorID` field with the
corresponding author information. If the news item is found, it is returned in the response with a
status code of 200. If the news item is not found, a custom error is thrown with a status code of
404. If any other error occurs, it is passed to the error handling middleware through the `next`
function. */
exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id).populate("authorID");

    if (!news) {
      throw new CustomError("News could not be found.", 404);
    }

    res.status(200).json({
      news: news,
    });
  } catch (err) {
    next(err);
  }
};

/* The `updateNews` function is responsible for updating a news item. */
exports.updateNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      throw new CustomError("News could not be found.", 404);
    }

    if (news.authorID.toString() !== req.authorID) {
      throw new CustomError("Not authorized.", 403);
    }

    news.title = req.body.title;
    news.description = req.body.description;
    news.content = req.body.content;
    news.tags = req.body.tags;

    const updatedNews = await news.save();

    res.status(200).json({
      message: "News successfully updated.",
      news: updatedNews,
    });
  } catch (err) {
    next(err);
  }
};

/* The `deleteNews` function is responsible for deleting a news. */
exports.deleteNews = async (req, res, next) => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);

    if (!news) {
      throw new CustomError("News could not be found.", 404);
    }

    if (news.authorID.toString() !== req.authorID) {
      throw new CustomError("Not authorized.", 403);
    }

    await News.findByIdAndRemove(id);

    await Author.findByIdAndUpdate(news.authorID, {
      $pull: { news: id },
    });

    res.status(200).json({
      message: "News successfully deleted.",
    });
  } catch (err) {
    next(err);
  }
};
