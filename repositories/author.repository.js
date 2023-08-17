const Author = require("../models/author");

class AuthorRepository {
  async getAuthors() {
    return await Author.find();
  }

  async getAuthor(authorID) {
    return Author.findById(authorID).populate("news");
  }

  async addNewsToAuthor(newsID, authorID) {
    await Author.findByIdAndUpdate(authorID, {
      $push: { news: newsID },
    });
  }

  async deleteNewsFromAuthor(newsID, authorID) {
    await Author.findByIdAndUpdate(authorID, {
      $pull: { news: newsID },
    });
  }
}

module.exports = new AuthorRepository();
