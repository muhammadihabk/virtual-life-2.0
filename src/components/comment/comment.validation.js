const joi = require('joi');

module.exports.createCommentSchema = joi.object({
  post_id: joi.number().required(),
  parent_comment_id: joi.number().required(),
  comment_text: joi.string().required(),
});

module.exports.updateCommentSchema = joi.object({
  comment_text: joi.string().required(),
});
