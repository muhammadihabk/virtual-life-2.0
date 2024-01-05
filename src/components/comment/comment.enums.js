const { Comment } = require('../../../config/db/db.enums');

module.exports.CommentDefaultSelect = [
  Comment.ID,
  Comment.AUTHOR_ID,
  Comment.COMMENT_TEXT,
  Comment.CREATED_AT,
  Comment.UPDATED_AT,
];
