const mongoose = require("mongoose");

const convertDateFormat = require("../helpers/convert-date-format");

const newsSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: ["General"],
      required: true,
    },
    authorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Author",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

newsSchema.methods.toJSON = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    content: this.content,
    tags: this.tags,
    createdAt: convertDateFormat(this.createdAt),
    updatedAt: convertDateFormat(this.updatedAt),
    author: {
      id: this.authorID._id,
      name: this.authorID.name,
      surname: this.authorID.surname,
    },
  };
};

newsSchema.methods.toJSONForSummaryOfNews = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    createdAt: convertDateFormat(this.createdAt),
    author: {
      id: this.authorID._id,
      name: this.authorID.name,
      surname: this.authorID.surname,
    },
  };
};

module.exports = mongoose.model("News", newsSchema);
