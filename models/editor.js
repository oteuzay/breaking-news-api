const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema(
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
    role: {
      type: String,
      default: "Editor",
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

module.exports = mongoose.model("Editor", editorSchema);
