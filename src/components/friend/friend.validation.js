const joi = require('joi');
const { SortOrder } = require('../../../config/db/db.enums');
const { UserAllowedSelect } = require('../user/user.enums');

module.exports.addFriendSchema = joi.object({
  virtual_life_user_id: joi.number().required(),
  friend_id: joi.number().required(),
});

module.exports.searchFriendsSchema = joi.object({
  select: joi.array().items(joi.string().valid(...UserAllowedSelect)),
  filter: joi.object({
    friendsIds: joi.array().items(joi.number()),
    friendsEmails: joi.array().items(joi.string().email()),
  }),
  paginate: joi.object({
    limit: joi.number(),
    offset: joi.number(),
  }),
  sort: joi.array().items(
    joi.object({
      orderBy: joi
        .string()
        .valid(...UserAllowedSelect)
        .required(),
      sortOrder: joi.string().valid(...SortOrder),
    })
  ),
});
