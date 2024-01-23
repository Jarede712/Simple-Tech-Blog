const router = require("express").Router();
const { Post, User, Comment } = require("../models");

// GET route for the homepage
router.get("/", async (req, res) => {
  try {
    // Fetch all posts and include associated User and Comment data
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    // Serialize data so the template can read it
    const posts = postData.map((post) => post.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("home", {
      posts,
      logged_in: req.session.logged_in || false, // Adjust based on your session management
    });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
