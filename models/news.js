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
    editorID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Editor",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/* The `newsSchema.methods.toJSONForNews` function is a method that is added to the `newsSchema`
object. This method is used to convert a news document from the MongoDB database into a JSON object
with specific properties. */
newsSchema.methods.toJSONForNews = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    content: this.content,
    tags: this.tags,
    createdAt: convertDateFormat(this.createdAt),
    updatedAt: convertDateFormat(this.updatedAt),
    editor: {
      id: this.editorID._id,
      name: this.editorID.name,
      surname: this.editorID.surname,
    },
  };
};

/* The `newsSchema.methods.toJSONForPreviewOfNews` function is a method that is added to the
`newsSchema` object. This method is used to convert a news document from the MongoDB database into a
JSON object with specific properties, but with a simplified structure compared to the
`toJSONForNews` method. */
newsSchema.methods.toJSONForPreviewOfNews = function () {
  return {
    id: this._id,
    title: this.title,
    description: this.description,
    createdAt: convertDateFormat(this.createdAt),
    editor: {
      id: this.editorID._id,
      name: this.editorID.name,
      surname: this.editorID.surname,
    },
  };
};

module.exports = mongoose.model("News", newsSchema);
