const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const PostService = {
  createPost: async (post) => {
    try {
      // find user
      const user = await userModel.findById(post.user);
      if (!user) return null;
      const newPost = new postModel(post);
      await newPost.save();
      user.posts.push(newPost._id);
      await user.save();
      return newPost.populate("user", "name email phone address");
    } catch (error) {
      throw error;
    }
  },

  getAllPosts: async () => {
    try {
      const posts = await postModel
        .find()
        .populate("user", "name email phone address");
      return posts;
    } catch (error) {
      throw error;
    }
  },

  getPostById: async (id) => {
    try {
      const post = await postModel
        .findById(id)
        .populate("user", "name email phone address");
      return post;
    } catch (error) {
      throw error;
    }
  },

  updatePost: async (id, post) => {
    try {
      const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });
      return updatedPost.populate("user", "name email phone address");
    } catch (error) {
      throw error;
    }
  },

  deletePost: async (id) => {
    try {
      const post = await postModel.findByIdAndDelete(id);
      if (!post) {
        return null;
      } else {
        const delPost = await userModel.findByIdAndUpdate(post.user, { $pull: { posts: post._id } });
        return delPost;
      }
    } catch (error) {
      throw error;
    }
  },

  deleteAllPostByUserId: async (id) => {
    try {
      const user = await userModel.findById(id);
      if (!user) {
        return null;
      } else {
        const posts = user.posts;
        for (let i = 0; i < posts.length; i++) {
          await postModel.findByIdAndDelete(posts[i]);
        }
        return user;
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = PostService