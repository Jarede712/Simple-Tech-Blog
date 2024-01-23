const router = require("express").Router();
const { Comment } = require("../../models");
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// POST route to add a new comment
router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.user_id, // User id from the session
      post_id: req.body.post_id, // Ensure post_id is passed in the request body
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
