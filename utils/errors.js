/* The class "Custom" extends the built-in "Error" class and allows for the creation of custom error
objects with a specified code, status code, and data. */
class Custom extends Error {
  constructor(code, data) {
    super(errorMessages[code].message);
    this.statusCode = errorMessages[code].status;
    this.data = data;
  }
}

const errorMessages = {
  AUTHOR_NOT_FOUND: {
    message: "Author could not be found.",
    status: 404,
  },
  EMAIL_NOT_FOUND: {
    message: "Email could not be found.",
    status: 404,
  },
  EMAIL_ALREADY_EXISTS: {
    message: "E-Mail address already exists!",
    status: 422,
  },
  PASSWORD_OR_EMAIL_WRONG: {
    message: "Password or email is incorrect.",
    status: 401,
  },
  NEWS_NOT_FOUND: {
    message: "News could not be found.",
    status: 404,
  },
  NOT_AUTHORIZED: {
    message: "Not authorized",
    status: 403,
  },
  UNAUTHORIZED: {
    message: "Unauthorized",
    status: 401,
  },
};

/**
 * The function `throwError` throws a custom error with a specified code and data.
 * @param code - The code parameter is used to specify the error code or identifier for the error being
 * thrown. It can be any value that helps identify the specific error.
 * @param data - The `data` parameter is an optional parameter that represents any additional
 * information or data that you want to include when throwing the error. It can be of any data type,
 * such as a string, number, object, or array.
 */
const throwError = (code, data) => {
  throw new Custom(code, data);
};

module.exports = { Custom, throwError };
