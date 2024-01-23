const router = require("express").Router();
const { Post } = require("../../models");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// POST route to create a new blog post
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET route to retrieve a specific post by id
router.get("/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {});

    if (!postData) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// PUT route to update a post
router.put("/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the post belongs to the logged-in user
      },
    });

    if (!post[0]) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a post
router.delete("/:id", isAuthenticated, async (req, res) => {
  try {
    const post = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure the post belongs to the logged-in user
      },
    });

    if (!post) {
      res.status(404).json({ message: "No post found with this id!" });
      return;
    }

    res.status(200).json({ message: "Post deleted!" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
