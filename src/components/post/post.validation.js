const joi = require('joi');
const { PostSearchAllowedSelect } = require('./post.enums');
const { Post, SortOrder } = require('../../../config/db/db.enums');

module.exports.createPostSchema = joi.object({
  post_text: joi.string().required(),
  post_image: joi.string(),
});

module.exports.searchPostsSchema = joi.object({
  select: joi.array().items(joi.string().valid(...PostSearchAllowedSelect)),
  filter: joi.object({
    [Post.AUTHOR_ID]: joi.number(),
    [Post.POST_TEXT]: joi.string(),
  }),
  paginate: joi.object({
    limit: joi.number(),
    offset: joi.number(),
  }),
  sort: joi.array().items(
    joi.object({
      orderBy: joi
        .string()
        .valid(...PostSearchAllowedSelect)
        .required(),
      sortOrder: joi.string().valid(...SortOrder),
    })
  ),
});

module.exports.updatePostSchema = joi.object({
  post_text: joi.string(),
  post_image: joi.string(),
}).min(1);