const mongoose = require("mongoose");

const dateFormat = require("../helpers/date-format.helper.js");
const bcrypt = require("bcryptjs/dist/bcrypt");

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
        createdAt: dateFormat(news.createdAt),
      };
    }),
    createdAt: dateFormat(this.createdAt),
  };
};

authorSchema.pre("save", async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    next(error);
  }
});

authorSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw error;
  }
};

module.exports = mongoose.model("Author", authorSchema);
