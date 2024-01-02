const joi = require('joi');

module.exports.createReactionSchema = joi.object({
  activity_id: joi.number().required(),
  activity_kind: joi.string().required(),
  reaction_kind: joi.string().required(),
});