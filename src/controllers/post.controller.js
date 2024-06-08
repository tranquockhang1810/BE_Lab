const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

// Create post
exports.createPost = async (req, res) => {
  const { title, content, userId } = req.body;
  try {
    const post = new postModel({ title, content, userId });
    await post.save();
    await userModel.findByIdAndUpdate(userId, { $push: { posts: post._id } });
    res.send(post);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get all posts
exports.getAllPosts = async (req, res) => {
  await postModel
    .find()
    .then((posts) => {
      res.send(posts);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Get post details
exports.getPostById = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findById(id);
    if (!post) {
      return res.status(404).send("Post not found");
    } else {
      return res.send(post);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Update post
exports.updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await postModel.findByIdAndUpdate(
      id,
      { title, content },
      { new: true }
    );
    if (!post) {
      return res.status(404).send("Post not found");
    } else {
      return res.send(post);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

// Delete post
exports.deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await postModel.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).send("Post not found");
    } else {
      await userModel.findByIdAndUpdate(post.userId, { $pull: { posts: post._id } });
      return res.send(post);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}