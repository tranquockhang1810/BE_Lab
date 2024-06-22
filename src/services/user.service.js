const { validateEmail, validateLength } = require("../helpers/FieldValidation");
const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const PostService = require("../services/post.service");

const UserService = {
  createUser: async (user) => {
    try {
      const newUser = new userModel(user);
      return await newUser.save();
    } catch (error) {
      throw error;
    }
  },

  getAllUsers: async () => {
    try {
      const users = await userModel
        .find()
        .populate("posts", "title content");
      return users;
    } catch (error) {
      throw error;
    }
  },

  getUserById: async (id) => {
    try {
      const user = await userModel
        .findById(id)
        .populate("posts", "title content");
      return user;
    } catch (error) {
      throw error;
    }
  },

  updateUser: async (id, user) => {
    try {
      const { name, email, phone, address } = user
      if (
        validateLength(name, 6) === false ||
        validateEmail(email) === false ||
        validateLength(phone, 10) === false ||
        validateLength(address, 10) === false
      ) {
        return null;
      }
      const newUser = await userModel.findByIdAndUpdate(
        id,
        { name, email, phone, address },
        { new: true }
      );
      return newUser;
    } catch (error) {
      throw error;
    }
  },

  deleteUser: async (id) => {
    try {
      // delete post
      await postModel.deleteMany({ user: id });
      const user = await userModel.findByIdAndDelete(id);
      if (user) {
        await PostService.deleteAllPostByUserId(id);
      }
      return user;
    } catch (error) {
      throw error;
    }
  },
};

module.exports = UserService