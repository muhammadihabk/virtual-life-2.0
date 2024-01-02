const { Reaction, Table } = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { GetReactionsOfActivitySelect } = require('./reaction.enums');

module.exports.createReactionRepository =
  async function createReactionRepository(reactionDetails) {
    try {
      // TODO: Use the author id from the token when authentication is implemented
      reactionDetails[Reaction.AUTHOR_ID] = 1;

      await knexClient
        .queryBuilder()
        .from(Table.REACTION)
        .insert(reactionDetails);
    } catch (error) {
      console.log('[Reaction Repository]:', error);
      throw error;
    }
  };

module.exports.getReactionsOfActivityRepository =
  async function getReactionsOfActivityRepository(activityId, activityKind) {
    try {
      const reactions = await knexClient
        .queryBuilder()
        .select(GetReactionsOfActivitySelect)
        .from(Table.REACTION)
        .where(Reaction.ACTIVITY_ID, activityId)
        .andWhere(Reaction.ACTIVITY_KIND, activityKind);

      return reactions;
    } catch (error) {
      console.log('[Reaction Repository]:', error);
      throw error;
    }
  };

module.exports.deleteReactionsOfActivityRepository =
  async function deleteReactionsOfActivityRepository(activityId, activityKind) {
    try {
      // TODO: Use the author id from the token when authentication is implemented
      const countDeletedRows = await knexClient
        .queryBuilder()
        .from(Table.REACTION)
        .del()
        .where(Reaction.AUTHOR_ID, 1)
        .andWhere(Reaction.ACTIVITY_ID, activityId)
        .andWhere(Reaction.ACTIVITY_KIND, activityKind);

      return countDeletedRows;
    } catch (error) {
      console.log('[Reaction Repository]:', error);
      throw error;
    }
  };
