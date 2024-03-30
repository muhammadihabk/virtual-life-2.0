const { createReactionRepository, getReactionsOfActivityRepository, deleteReactionsOfActivityRepository } = require('./reaction.repository');

module.exports.createReactionService = async function createReactionService(user, reactionDetails) {
  await createReactionRepository(user, reactionDetails);
};

module.exports.getReactionsOfActivityService = function getReactionsOfActivityService(activityId, activityKind) {
  return getReactionsOfActivityRepository(activityId, activityKind);
};

module.exports.deleteReactionsOfActivityService = function deleteReactionsOfActivityService(user, activityId, activityKind) {
  return deleteReactionsOfActivityRepository(user, activityId, activityKind);
};
