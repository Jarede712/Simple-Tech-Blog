const Sequelize = require("sequelize");
const sequelize = require("../config/config");

// Import models
const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

// Associations
User.hasMany(Post, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, delete all their posts
});

Post.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, delete all their posts
});

Post.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE", // If a post is deleted, delete all its comments
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE", // If a user is deleted, delete all their comments
});

Comment.belongsTo(Post, {
  foreignKey: "post_id",
  onDelete: "CASCADE", // If a post is deleted, delete all its comments
});

// Export models and sequelize connection
module.exports = {
  sequelize,
  User,
  Post,
  Comment,
};
