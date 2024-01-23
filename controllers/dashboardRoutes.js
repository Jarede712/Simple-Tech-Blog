const router = require("express").Router();
const { Post, User, Comment } = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");

// GET route for the dashboard
router.get("/", isAuthenticated, async (req, res) => {
  try {
    // Fetch the posts of the logged-in user
    const userPostsData = await Post.findAll({
      where: {
        user_id: req.session.user_id,
      },
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = userPostsData.map((post) => post.get({ plain: true }));

    // Render the dashboard page with the user's posts
    res.render("dashboard", {
      posts,
      logged_in: req.session.logged_in, // Assuming your session keeps track of this
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// POST route to create a new post
router.post("/create", isAuthenticated, async (req, res) => {
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

// PUT route to update an existing post
router.put("/update/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedPost = await Post.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (updatedPost > 0) {
      res.status(200).json(updatedPost);
    } else {
      res.status(404).json({ message: "No post found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE route to delete a post
router.delete("/delete/:id", isAuthenticated, async (req, res) => {
  try {
    const deletedPost = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (deletedPost > 0) {
      res.status(200).json(deletedPost);
    } else {
      res.status(404).json({ message: "No post found with this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
