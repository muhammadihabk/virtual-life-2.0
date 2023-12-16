const joi = require('joi');
const { UserSearchAllowedSelect } = require('./user.enums');
const { SortOrder } = require('../../../config/db/db.enums');

const createUserSchema = joi.object({
  first_name: joi.string().required(),
  last_name: joi.string().required(),
  dob: joi.string().required(),
  email: joi.string().email().required(),
  user_password: joi.string().required(),
});

const searchUsersSchema = joi.object({
  select: joi.array().items(joi.string().valid(...UserSearchAllowedSelect)),
  filter: joi.object({
    ids: joi.array().items(joi.number()),
    emails: joi.array().items(joi.string().email()),
  }),
  paginate: joi.object({
    limit: joi.number(),
    offset: joi.number(),
  }),
  sort: joi.array().items(
    joi.object({
      orderBy: joi.string().valid(...UserSearchAllowedSelect).required(),
      sortOrder: joi.string().valid(...SortOrder),
    })
  ),
});

const updateUserSchema = joi.object({
  first_name: joi.string(),
  last_name: joi.string(),
  dob: joi.string(),
  email: joi.string().email(),
  user_password: joi.string(),
});

module.exports = {
  createUserSchema,
  searchUsersSchema,
  updateUserSchema,
};