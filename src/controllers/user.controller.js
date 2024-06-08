const userModel = require("../models/user.model");

// Create user
exports.createUser = async (req, res) => {
  const { name, email } = req.body;
  const user = new userModel({ name, email });
  await user
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((error) => {
      next(error);
    });
};

// Get all users
exports.getAllUsers = async (req, res) => {
  await userModel
    .find()
    .populate("posts", "title content")
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      next(error);
    });
};

// Get user details
exports.getUserById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userModel
    .findById(id)
    .populate("posts", "title content");
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      return res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  try {
    const user = await userModel.findByIdAndUpdate(
      id,
      { name, email },
      { new: true }
    );
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      return res.send(user);
    }
  } catch (error) {
    next(error);
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).send("User not found");
    } else {
      return res.send(user);
    }
  } catch (error) {
    next(error);
  }
};