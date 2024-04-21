const { Reaction, Table } = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { GetReactionsOfActivitySelect, ReactionDefaultSelect } = require('./reaction.enums');

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

module.exports.deleteReactionsOfActivityRepository = async function deleteReactionsOfActivityRepository(user, activityId) {
  try {
    const countDeletedRows = knexClient.queryBuilder().from(Table.REACTION).del().where(Reaction.AUTHOR_ID, user.id).andWhere(Reaction.ID, activityId);

    return countDeletedRows;
  } catch (error) {
    console.log('[Reaction Repository]:', error);
    throw error;
  }
};

module.exports.getReactionByIdRepository = async function getReactionByIdRepository(reactionId) {
  try {
    const [reaction] = await knexClient
      .queryBuilder()
      .select(ReactionDefaultSelect)
      .from(Table.REACTION)
      .where({
        [Reaction.ID]: reactionId,
      });

    return reaction;
  } catch (error) {
    console.log('[Reaction Repository]:', error);
    throw error;
  }
};
