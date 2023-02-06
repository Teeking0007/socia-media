const express = require("express");
const { default: mongoose } = require("mongoose");
const PostsModal = require("../Modal/PostModal.js");
const UsersModal = require("../Modal/UserModal.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const newPost = new PostsModal(req.body);

  try {
    newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const post = await PostsModal.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put("/:id", async (req, res) => {
  const postId = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostsModal.findById(postId);
    if (post.userId === userId) {
      post.updateOne({ $set: req.body });
      res.status(200).json("Post updated");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.delete("/:id", async (req, res) => {
  const deleteId = req.params.id;
  const { userId } = req.body;

  try {
    const deletePost = await PostsModal.findById(deleteId);
    if (deletePost.userId === userId) {
      await PostsModal.findByIdAndDelete(deleteId);
      res.status(200).json("Posted deleted");
    } else {
      res.status(403).json("Action forbidden");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});
router.put("/:id/like", async (req, res) => {
  const id = req.params.id;
  const { userId } = req.body;
  try {
    const post = await PostsModal.findById(id);
    if (!post.likes.includes(userId)) {
      await post.updateOne({ $push: { likes: userId } });
      res.status(200).json("Post Liked");
    } else {
      await post.updateOne({ $pull: { likes: userId } });
      res.status(200).json("Post unliked");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id/timeline", async (req, res) => {
  const userId = req.params.id;
  try {
    const currentUserPosts = await PostsModal.find({ userId });
    const followingPosts = await UsersModal.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);
    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return b.createdAt - a.createdAt;
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
