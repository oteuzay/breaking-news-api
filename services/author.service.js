const AuthorRepository = require("../repositories/author.repository");

const createError = require("http-errors");

class AuthorService {
  async getAuthors() {
    return await AuthorRepository.getAuthors();
  }

  async getAuthor(authorID) {
    const author = await AuthorRepository.getAuthor(authorID);

    if (!author) {
      throw createError.NotFound("Author could not be found.");
    }

    return author;
  }
}

module.exports = new AuthorService();
