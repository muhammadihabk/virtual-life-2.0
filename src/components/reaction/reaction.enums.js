const { Reaction } = require('../../../config/db/db.enums');

module.exports.GetReactionsOfActivitySelect = [`${Reaction.AUTHOR_ID}`, `${Reaction.REACTION_KIND}`];

module.exports.ReactionDefaultSelect = [Reaction.ID, Reaction.AUTHOR_ID, Reaction.ACTIVITY_ID, Reaction.REACTION_KIND, Reaction.ACTIVITY_KIND];
