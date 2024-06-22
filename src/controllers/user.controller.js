const userModel = require("../models/user.model");
const UserService = require("../services/user.service");

// Create user
exports.createUser = async (req, res, next) => {
  try {
    const user = req.body;
    const data = await UserService.createUser(user);
    if (data) {
      res.status(201).json({
        data: data,
        message: "User created successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get all users
exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await UserService.getAllUsers();
    if (users) {
      res.status(200).json({
        data: users,
        message: "Get users successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get user details
exports.getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.getUserById(id);
    if (!user) {
      return next({
        status: 404,
        message: "User not found",
      });
    } else {
      return res.status(200).json({
        data: user,
        message: "Get user successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = req.body;
    const newUser = await UserService.updateUser(id, user);
    if (!newUser) {
      return next({
        status: 404,
        message: "Update user failed",
      });
    } else {
      return res.send({
        data: newUser,
        message: "Update user successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await UserService.deleteUser(id);
    if (!user) {
      return next({
        status: 404,
        message: "Delete user failed",
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "Delete user successfully",
      });
    }
  } catch (error) {
    next(error);
  }
};