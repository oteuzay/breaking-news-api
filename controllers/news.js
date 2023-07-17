const News = require("../models/news");
const User = require("../models/user");

exports.getNews = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const countOfNews = await News.find().countDocuments();
    const news = await News.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    res.status(200).json({
      news: news,
      countOfNews: countOfNews,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.getNewsById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      news: news,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.createNews = async (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const news = News({
    title: title,
    content: content,
  });

  try {
    await news.save();

    const user = await User.findById(req.userId);
    user.news.push(news);

    await user.save();

    res.status(201).json({
      message: "News created.",
      news: news,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.updateNews = async (req, res, next) => {
  const id = req.params.id;

  const title = req.body.title;
  const content = req.body.content;

  try {
    const news = await News.findById(id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    news.title = title;
    news.content = content;

    const result = await news.save();

    res.status(200).json({
      message: "News updated",
      news: result,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.deleteNews = async (req, res, next) => {
  const id = req.params.id;

  try {
    const news = await News.findById(id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    await News.findByIdAndRemove(id);

    const user = await User.findById(req.userId);
    user.news.pull(id);
    await user.save();

    res.status(200).json({
      message: "Deleted news.",
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
