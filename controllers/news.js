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

exports.getNewsById = (req, res, next) => {};

exports.createNews = (req, res, next) => {};

exports.updateNews = (req, res, next) => {};

exports.deleteNews = (req, res, next) => {};
