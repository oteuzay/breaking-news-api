const newsService = require("../services/news.service");

exports.createNews = async (req, res, next) => {
  try {
    const news = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
      authorID: req.authorID,
    };

    const createdNews = await newsService.createNews(news);

    res.status(201).json({
      message: "News successfully created.",
      news: createdNews,
    });
  } catch (err) {
    next(err);
  }
};

exports.getNews = async (req, res, next) => {
  const currentPage = parseInt(req.query.page || 1);
  const perPage = 10;

  try {
    const countNews = await newsService.countNews();
    const news = await newsService.getNews(currentPage, perPage);

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

exports.getNewsById = async (req, res, next) => {
  try {
    const newsID = req.params.id;

    const news = await newsService.getNewsById(newsID);

    res.status(200).json({
      news: news,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateNews = async (req, res, next) => {
  try {
    const newsID = req.params.id;
    const authorID = req.authorID;

    const news = {
      title: req.body.title,
      description: req.body.description,
      content: req.body.content,
      tags: req.body.tags,
    };

    const updatedNews = await newsService.updateNews(newsID, authorID, news);

    res.status(200).json({
      message: "News successfully updated.",
      news: updatedNews,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteNews = async (req, res, next) => {
  try {
    const newsID = req.params.id;
    const authorID = req.authorID;

    await newsService.deleteNews(newsID, authorID);

    res.status(200).json({
      message: "News successfully deleted.",
    });
  } catch (err) {
    next(err);
  }
};
