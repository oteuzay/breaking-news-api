const authorRepository = require("../repositories/author.repository");
const newsRepository = require("../repositories/news.repository");

const createError = require("http-errors");

class NewsService {
  async createNews(news) {
    const createdNews = await newsRepository.createNews(news);
    await authorRepository.addNewsToAuthor(createdNews._id, news.authorID);

    return createdNews;
  }

  async countNews() {
    return newsRepository.countNews();
  }

  async getNews(currentPage, perPage) {
    return newsRepository.getNews(currentPage, perPage);
  }

  async getNewsById(newsID) {
    const news = await newsRepository.getNewsById(newsID);

    if (!news) {
      throw createError.NotFound("News could not be found.");
    }

    return news;
  }

  async updateNews(newsID, authorID, news) {
    const existingNews = await newsRepository.getNewsById(newsID);

    if (!existingNews) {
      throw createError.NotFound("News could not be found.");
    }

    if (existingNews.authorID._id.toString() !== authorID) {
      throw createError.Forbidden("Not authorized.");
    }

    for (const field in news) {
      existingNews[field] = news[field];
    }

    const updatedNews = await newsRepository.updateNews(existingNews);

    return updatedNews;
  }

  async deleteNews(newsID, authorID) {
    const news = await newsRepository.getNewsById(newsID);

    if (!news) {
      throw createError.NotFound("News could not be found.");
    }

    if (news.authorID._id.toString() !== authorID) {
      throw createError.Forbidden("Not authorized.");
    }

    await newsRepository.deleteNews(newsID);
    await authorRepository.deleteNewsFromAuthor(newsID, authorID);
  }
}

module.exports = new NewsService();
