const authorRepository = require("../repositories/author.repository");

const createError = require("http-errors");

const { signAccessToken } = require("../utils/auth.util");

class AuthService {
  async signIn(email, password) {
    const existingAuthor = await authorRepository.getAuthorByEmail(email);

    if (!existingAuthor) {
      throw createError.NotFound("Author could not be found.");
    }

    const isEqual = await existingAuthor.isValidPassword(password);

    if (!isEqual) {
      throw createError.Unauthorized("Password or email is incorrect.");
    }

    const token = signAccessToken(existingAuthor._id.toString());

    return token;
  }

  async signUp(author) {
    const existingAuthor = await authorRepository.getAuthorByEmail(
      author.email
    );

    if (existingAuthor) {
      throw createError.UnprocessableEntity("E-Mail address already exists!");
    }

    const createdAuthor = await authorRepository.createAuthor(author);

    return createdAuthor;
  }
}

module.exports = new AuthService();
