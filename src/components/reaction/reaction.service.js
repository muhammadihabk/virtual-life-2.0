const { createReactionRepository, getReactionsOfActivityRepository, deleteReactionsOfActivityRepository, getReactionByIdRepository } = require('./reaction.repository');

module.exports.createReactionService = async function createReactionService(user, reactionDetails) {
  await createReactionRepository(user, reactionDetails);
};

module.exports.getReactionsOfActivityService = function getReactionsOfActivityService(activityId, activityKind) {
  return getReactionsOfActivityRepository(activityId, activityKind);
};

module.exports.deleteReactionsOfActivityService = function deleteReactionsOfActivityService(user, activityId) {
  return deleteReactionsOfActivityRepository(user, activityId);
};

module.exports.getReactionByIdService = function getReactionByIdService(id) {
  return getReactionByIdRepository(id);
};
