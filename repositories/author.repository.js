const Author = require("../models/author.model");

class AuthorRepository {
  async createAuthor(author) {
    return await Author.create(author);
  }

  async getAuthors() {
    return await Author.find();
  }

  async getAuthorById(authorID) {
    return await Author.findById(authorID).populate("news");
  }

  async getAuthorByEmail(email) {
    return Author.findOne({ email: email });
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
