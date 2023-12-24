const { Post } = require("../../../config/db/db.enums");

module.exports.PostDefaultSelect = [
  Post.AUTHOR_ID,
  Post.POST_TEXT,
  Post.POST_IMAGE,
];

module.exports.PostSearchAllowedSelect = [
  Post.AUTHOR_ID,
  Post.POST_TEXT,
  Post.POST_IMAGE,
  Post.CREATED_AT,
  Post.UPDATED_AT,
];