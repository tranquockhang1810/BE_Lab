const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateMinLength } = require("../helpers/FieldValidation");

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
    validate: [
      {
        validator: (title) => validateMinLength(title, 6),
        message: `Title must be at least 6 characters long!`
      }
    ]
  },
  content: {
    type: String,
    required: true,
    validate: [
      {
        validator: (content) => validateMinLength(content, 6),
        message: `Content must be at least 6 characters long!`
      }
    ]
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Post", PostSchema);