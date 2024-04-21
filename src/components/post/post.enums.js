const { Post } = require('../../../config/db/db.enums');

PostDefaultSelect = [Post.ID, Post.AUTHOR_ID, Post.POST_TEXT, Post.POST_IMAGE, Post.CREATED_AT, Post.UPDATED_AT];

PostSearchAllowedSelect = PostDefaultSelect;

module.exports = {
  PostDefaultSelect,
  PostSearchAllowedSelect,
};
