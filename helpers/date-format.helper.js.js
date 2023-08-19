const apiConfig = require("../config/api.config");

/* The code is exporting a function that takes a `dateString` parameter. Inside the function, it
creates a new `Date` object using the `dateString`. It then defines an `options` object that
specifies the desired format for the date and time. Finally, it calls the `toLocaleString` method on
the `date` object, passing in the `LOCALE` and `options` as arguments, and returns the
formatted date and time as a string. */
module.exports = (dateString) => {
  const date = new Date(dateString);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };

  return date.toLocaleString(apiConfig.LOCALE, options);
};
