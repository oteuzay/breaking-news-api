const News = require("../models/news.model");

class NewsRepository {
  async createNews(news) {
    return News.create(news);
  }

  async countNews() {
    return News.find().countDocuments();
  }

  async getNews(currentPage, perPage) {
    return News.find()
      .populate("authorID")
      .sort({ createdAt: -1 })
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
  }

  async getNewsById(newsID) {
    return News.findById(newsID).populate("authorID");
  }

  async updateNews(news) {
    return news.save();
  }

  async deleteNews(newsID) {
    return News.findByIdAndDelete(newsID);
  }
}

module.exports = new NewsRepository();
