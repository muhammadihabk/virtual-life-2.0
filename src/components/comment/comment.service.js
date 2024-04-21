const { createCommentRepository, getCommentsOfPostRepository, updateCommentRepository, deleteCommentRepository, getCommentByIdRepository } = require('./comment.repository');

module.exports.createCommentService = async function createCommentService(userId, commentDetails) {
  await createCommentRepository(userId, commentDetails);
};

module.exports.getCommentsService = function getCommentsService(commentId) {
  return getCommentsOfPostRepository(commentId);
};

module.exports.updateCommentService = function updateCommentService(commentId, commentDetails) {
  return updateCommentRepository(commentId, commentDetails);
};

module.exports.deleteCommentService = function deleteCommentService(id) {
  return deleteCommentRepository(id);
};

module.exports.getCommentByIdService = function getCommentByIdService(id) {
  return getCommentByIdRepository(id);
};
