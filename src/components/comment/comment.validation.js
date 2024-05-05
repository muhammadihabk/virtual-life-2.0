const joi = require('joi');

module.exports.createCommentSchema = joi.object({
  postId: joi.number().required(),
  parentCommentId: joi.number().allow(null).required(),
  commentText: joi.string().required(),
});

module.exports.updateCommentSchema = joi.object({
  commentText: joi.string().required(),
});
