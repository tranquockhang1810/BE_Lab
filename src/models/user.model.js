const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { validateEmail, validateMaxLength, validateMinLength } = require("../helpers/FieldValidation");

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
