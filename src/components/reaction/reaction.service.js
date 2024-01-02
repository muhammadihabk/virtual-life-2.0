const {
  createReactionRepository,
  getReactionsOfActivityRepository,
  deleteReactionsOfActivityRepository,
} = require('./reaction.repository');

module.exports.createReactionService = async function createReactionService(
  reactionDetails
) {
  await createReactionRepository(reactionDetails);
};

module.exports.getReactionsOfActivityService =
  function getReactionsOfActivityService(activityId, activityKind) {
    return getReactionsOfActivityRepository(activityId, activityKind);
  };

module.exports.deleteReactionsOfActivityService =
  function deleteReactionsOfActivityService(activityId, activityKind) {
    return deleteReactionsOfActivityRepository(activityId, activityKind);
  };
