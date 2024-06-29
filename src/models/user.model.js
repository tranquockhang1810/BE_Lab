const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateEmail, validateMaxLength, validateMinLength } = require("../helpers/FieldValidation");

// Model
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - phone
 *         - address
 *         - posts
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the user
 *         name:
 *           type: string
 *           description: The name of the user
 *         phone:
 *           type: string
 *           description: The phone of the user
 *         email:
 *           type: string
 *           description: The email of the user
 *         address:
 *           type: string
 *           description: The address of the user
 *         posts:
 *           type: array
 *           items:
 *             type: string
 *           description: The posts of the user
 *       example:
 *         id: 123
 *         name: John Doe
 *         phone: 0123456789
 *         address: 123 Main Street
 *         email: "7g6yK@example.com"
 *         posts: []
 */

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: (name) => validateMinLength(name, 6),
        message: `Name must be at least 6 characters long!`
      },
    ]
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      {
        validator: validateEmail,
        message: props => `${props.value} is not a valid email address!`
      },
      {
        validator: (email) => validateMinLength(email, 6),
        message: `Email must be at least 6 characters long!`
      },
    ]
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: (phone) => validateMinLength(phone, 10) && phone.length === 10,
      message: `Phone should be exactly 10 characters.`
    }
  },
  address: {
    type: String,
    validate: {
      validator: (address) => validateMinLength(address, 10),
      message: `Address should be more than 10 characters.`
    }
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
      default: []
    }
  ]
});

module.exports = mongoose.model("User", UserSchema);
