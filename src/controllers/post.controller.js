const postModel = require("../models/post.model");
const userModel = require("../models/user.model");
const PostService = require("../services/post.service");

// Create post
exports.createPost = async (req, res, next) => {
  try {
    const { title, content, user } = req.body;
    const post = await PostService.createPost({ title, content, user });
    if (post) {
      res.status(201).json({
        data: post,
        message: "Post created successfully"
      });
    }
  } catch (error) {
    next(error);
  }
};

// Get all posts
exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await PostService.getAllPosts();
    if (posts) {
      res.status(200).json({
        data: posts,
        message: "Get posts successfully"
      });
    }
  } catch (err) {
    next(err);
  }
};

// Get post details
exports.getPostById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await PostService.getPostById(id);
    if (!post) {
      return next({
        status: 404,
        message: "Post not found"
      });
    } else {
      res.status(200).json({
        data: post,
        message: "Get post successfully"
      });
    }
  } catch (error) {
    next(error);
  }
}

// Update post
exports.updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await PostService.updatePost(id, { title, content });
    if (!post) {
      return next({
        status: 404,
        message: "Post not found"
      });
    } else {
      return res.status(200).json({
        data: post,
        message: "Update post successfully"
      });
    }
  } catch (error) {
    next(error);
  }
}

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await PostService.deletePost(id);
    if (!post) {
      return next({
        status: 404,
        message: "Post not found"
      })
    } else {
      return res.status(200).json({
        message: "Post deleted successfully"
      });
    }
  } catch (error) {
    next(error);
  }
}