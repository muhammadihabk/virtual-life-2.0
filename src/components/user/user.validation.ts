import Joi = require('joi');
import { UserAllowedSelect } from './user.enums';
const { SortOrder } = require('../../../config/db/db.enums');

export const registerUserSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  dob: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const searchUsersSchema = Joi.object({
  select: Joi.array().items(Joi.string().valid()),
  filter: Joi.object({
    ids: Joi.array().items(Joi.number()),
    emails: Joi.array().items(Joi.string().email()),
  }),
  paginate: Joi.object({
    limit: Joi.number(),
    offset: Joi.number(),
  }),
  sort: Joi.array().items(
    Joi.object({
      orderBy: Joi.string().valid(...Object.values(UserAllowedSelect)).required(),
      sortOrder: Joi.string().valid(...Object.values(SortOrder)),
    })
  ),
});

export const updateUserSchema = Joi.object({
  firstName: Joi.string(),
  lastName: Joi.string(),
  dob: Joi.string(),
  email: Joi.string().email(),
  userPassword: Joi.string(),
});
