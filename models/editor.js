const mongoose = require("mongoose");

const editorSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model("Editor", editorSchema);