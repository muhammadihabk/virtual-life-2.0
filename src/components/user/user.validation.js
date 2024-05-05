const joi = require('joi');
const { UserAllowedSelect } = require('./user.enums');
const { SortOrder } = require('../../../config/db/db.enums');

const registerUserSchema = joi.object({
  firstName: joi.string().required(),
  lastName: joi.string().required(),
  dob: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().required(),
});

const searchUsersSchema = joi.object({
  select: joi.array().items(joi.string().valid(...UserAllowedSelect)),
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
      orderBy: joi
        .string()
        .valid(...UserAllowedSelect)
        .required(),
      sortOrder: joi.string().valid(...SortOrder),
    })
  ),
});

const updateUserSchema = joi.object({
  firstName: joi.string(),
  lastName: joi.string(),
  dob: joi.string(),
  email: joi.string().email(),
  userPassword: joi.string(),
});

module.exports = {
  registerUserSchema,
  searchUsersSchema,
  updateUserSchema,
};
