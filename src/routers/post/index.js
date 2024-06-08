const express = require("express");
const router = express.Router();
const postController = require("../../controllers/post.controller");

// Create post
router.post("/", postController.createPost);

// Get all posts
router.get("/", postController.getAllPosts);

// Get post details
router.get("/:id", postController.getPostById);

// Update post
router.put("/:id", postController.updatePost);

// Delete post
router.delete("/:id", postController.deletePost);

module.exports = router;