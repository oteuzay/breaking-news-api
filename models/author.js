const mongoose = require("mongoose");

const convertDateFormat = require("../helpers/convert-date-format");

const authorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    news: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "News",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

authorSchema.methods.toJSONForSummaryOfAuthor = function () {
  return {
    id: this._id,
    name: this.name,
    surname: this.surname,
    statistics: {
      news: this.news.length,
    },
  };
};

authorSchema.methods.toJSON = function () {
  return {
    id: this._id,
    name: this.name,
    surname: this.surname,
    email: this.email,
    news: this.news.map((news) => {
      return {
        id: news._id,
        title: news.title,
        createdAt: convertDateFormat(news.createdAt),
      };
    }),
    createdAt: convertDateFormat(this.createdAt),
  };
};

module.exports = mongoose.model("Author", authorSchema);
