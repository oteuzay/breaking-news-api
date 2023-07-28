const News = require("../models/news");
const Editor = require("../models/editor");

const CustomError = require("../utils/errors");

/* The `createNews` function is responsible for creating a new news. */
exports.createNews = async (req, res, next) => {
  try {
    const news = await News({
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
      editorID: req.editorID,
    }).save();

    await Editor.findByIdAndUpdate(req.editorID, {
      $push: { news },
    });

    res.status(201).json({
      message: "News successfully created.",
      news: news.toJSONForNews(),
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
      .populate("editorID")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      news: news.map((news) => news.toJSONForPreviewOfNews()),
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
`News.findById` method to find the news item with the specified ID. It also populates the `editorID`
field of the news item with the corresponding editor object. If the news item is not found, it
throws a custom error with a status code of 404. If the news item is found, it returns the news item
as JSON in the response. */
exports.getNewsById = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id).populate("editorID");

    if (!news) {
      throw new CustomError("News could not be found.", 404);
    }

    res.status(200).json({
      news: news.toJSONForNews(),
    });
  } catch (err) {
    next(err);
  }
};

/* The `updateNews` function is responsible for updating a specific news item. It first retrieves the
news item with the specified ID using `News.findById`. If the news item is not found, it throws a
custom error with a status code of 404. If the news item is found, it checks whether the requesting
editor is authorized to update the news. If the editor is not authorized, it throws a custom error
with a status code of 403 (Forbidden). If the editor is authorized, the function updates the news
item's title, description, content, and tags based on the data received in the request body. After
successfully updating the news item, it returns a success message along with the updated news item
as JSON in the response. */
exports.updateNews = async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      throw new CustomError("News could not be found.", 404);
    }

    if (news.editorID.toString() !== req.editorID) {
      throw new CustomError("Not authorized.", 403);
    }

    news.title = req.body.title;
    news.description = req.body.description;
    news.content = req.body.content;
    news.tags = req.body.tags;

    const updatedNews = await news.save();

    res.status(200).json({
      message: "News successfully updated.",
      news: updatedNews.toJSONForNews(),
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

    if (news.editorID.toString() !== req.editorID) {
      throw new CustomError("Not authorized.", 403);
    }

    await News.findByIdAndRemove(id);

    await Editor.findByIdAndUpdate(news.editorID, {
      $pull: { news: id },
    });

    res.status(200).json({
      message: "News successfully deleted.",
    });
  } catch (err) {
    next(err);
  }
};
