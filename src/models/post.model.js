const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateMinLength } = require("../helpers/FieldValidation");

//Model
/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - user
 *       properties:
 *         id:
 *           type: ObjectId
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of the post
 *         content:
 *           type: string
 *           description: The content of the post
 *         user:
 *           type: ObjectId
 *           description: The user of the post
 *       example:
 *         id: 123
 *         title: Hello World
 *         content: This is my first post
 *         user: 123
 */


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