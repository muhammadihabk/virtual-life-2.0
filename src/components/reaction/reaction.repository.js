const { Reaction, Table } = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { GetReactionsOfActivitySelect } = require('./reaction.enums');

module.exports.createReactionRepository = async function createReactionRepository(user, reactionDetails) {
  try {
    reactionDetails[Reaction.AUTHOR_ID] = user.id;

    await knexClient.queryBuilder().from(Table.REACTION).insert(reactionDetails);
  } catch (error) {
    console.log('[Reaction Repository]:', error);
    throw error;
  }
};

module.exports.getReactionsOfActivityRepository = async function getReactionsOfActivityRepository(activityId, activityKind) {
  try {
    const reactions = await knexClient.queryBuilder().select(GetReactionsOfActivitySelect).from(Table.REACTION).where(Reaction.ACTIVITY_ID, activityId).andWhere(Reaction.ACTIVITY_KIND, activityKind);

    return reactions;
  } catch (error) {
    console.log('[Reaction Repository]:', error);
    throw error;
  }
};

module.exports.deleteReactionsOfActivityRepository = async function deleteReactionsOfActivityRepository(user, activityId, activityKind) {
  try {
    const countDeletedRows = await knexClient.queryBuilder().from(Table.REACTION).del().where(Reaction.AUTHOR_ID, user.id).andWhere(Reaction.ACTIVITY_ID, activityId).andWhere(Reaction.ACTIVITY_KIND, activityKind);

    return countDeletedRows;
  } catch (error) {
    console.log('[Reaction Repository]:', error);
    throw error;
  }
};
