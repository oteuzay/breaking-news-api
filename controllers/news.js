const News = require("../models/news");
const Editor = require("../models/editor");

const convertDateFormat = require("../helpers/convert-date-format");

exports.createNews = async (req, res, next) => {
  try {
    const editorID = req.userId;

    const news = await News({
      title: req.body.title,
      content: req.body.content,
      editorID: editorID,
    }).save();

    const editor = await Editor.findByIdAndUpdate(editorID, {
      $push: { news },
    });

    res.status(201).json({
      message: "News created.",
      news: {
        id: news.id,
        title: news.title,
        content: news.content,
        createdAt: news.createdAt,
        editor: {
          id: editor._id,
          name: editor.name,
          surname: editor.surname,
        },
      },
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }

    next(err);
  }
};

exports.getNews = async (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;

  try {
    const countOfNews = await News.find().countDocuments();
    const news = await News.find()
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    const output = news.map((item) => {
      return {
        id: item.id,
        title: item.title,
        content: item.content,
        createdAt: convertDateFormat(item.createdAt),
      };
    });

    res.status(200).json({
      news: output,
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
  try {
    const news = await News.findById(req.params.id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    const editor = await Editor.findById(news.editorID);

    res.status(200).json({
      news: {
        id: news.id,
        title: news.title,
        content: news.content,
        createdAt: convertDateFormat(news.createdAt),
        editor: {
          id: editor._id,
          name: editor.name,
          surname: editor.surname,
        },
      },
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
  const editorID = req.userId;

  try {
    const news = await News.findById(id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    if (news.editorID.toString() !== editorID) {
      const error = new Error("Not authorized!'");
      error.statusCode = 403;
      throw error;
    }

    news.title = req.body.title;
    news.content = req.body.content;

    const updatedNews = await news.save();

    res.status(200).json({
      message: "News updated.",
      news: {
        title: updatedNews.title,
        content: updatedNews.content,
        updatedAt: updatedNews.updatedAt,
      },
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
  const editorID = req.userId;

  try {
    const news = await News.findById(id);

    if (!news) {
      const error = new Error("Could not find news.");
      error.statusCode = 404;
      throw error;
    }

    if (news.editorID.toString() !== editorID) {
      const error = new Error("Not authorized!'");
      error.statusCode = 403;
      throw error;
    }

    await News.findByIdAndRemove(id);

    await Editor.findByIdAndUpdate(news.editorID, {
      $pull: { news: id },
    });

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
