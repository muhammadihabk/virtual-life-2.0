const joi = require('joi');

module.exports.createReactionSchema = joi.object({
  activityId: joi.number().required(),
  activityKind: joi.string().required(),
  reactionKind: joi.string().required(),
});
