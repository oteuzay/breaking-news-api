const News = require("../models/news");

exports.getNews = (req, res, next) => {
  News.find()
    .then((news) => {
      res.status(200).json({
        news: news,
      });
    })
    .catch((err) => console.log(err));
};

exports.getNewsById = (req, res, next) => {
  const id = req.params.id;

  News.findById(id)
    .then((news) => {
      res.status(200).json({
        news: news,
      });
    })
    .catch((err) => {
      console.log(err);
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
      console.log(err);
    });
};

exports.updateNews = (req, res, next) => {};

exports.deleteNews = (req, res, next) => {};
