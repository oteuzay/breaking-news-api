const News = require("../models/news");

exports.getNews = (req, res, next) => {
  News.find()
    .then((news) => {
      res.status(200).json({
        news: news,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getNewsById = (req, res, next) => {
  const id = req.params.id;

  News.findById(id)
    .then((news) => {
      if (!news) {
        const error = new Error("Could not find news.");
        error.statusCode = 404;
        throw error;
      }

      res.status(200).json({
        news: news,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.createNews = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;

  const news = News({
    title: title,
    content: content,
  });

  news
    .save()
    .then(() => {
      res.status(201).json({
        message: "News created.",
        news: news,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateNews = (req, res, next) => {
  const id = req.params.id;

  const title = req.body.title;
  const content = req.body.content;

  News.findById(id)
    .then((news) => {
      if (!news) {
        const error = new Error("Could not find news.");
        error.statusCode = 404;
        throw error;
      }

      news.title = title;
      news.content = content;

      return news.save();
    })
    .then((result) => {
      res.status(200).json({
        message: "News updated",
        news: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteNews = (req, res, next) => {
  const id = req.params.id;

  News.findById(id)
    .then((news) => {
      if (!news) {
        const error = new Error("Could not find news.");
        error.statusCode = 404;
        throw error;
      }

      return News.findByIdAndRemove(id);
    })
    .then(() => {
      res.status(200).json({
        message: "Deleted news.",
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
