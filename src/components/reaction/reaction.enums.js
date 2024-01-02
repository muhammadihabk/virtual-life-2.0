const { Reaction } = require('../../../config/db/db.enums');

module.exports.GetReactionsOfActivitySelect = [
  `${Reaction.AUTHOR_ID}`,
  `${Reaction.REACTION_KIND}`,
];
