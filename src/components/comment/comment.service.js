const { createCommentRepository, getCommentsRepository, updateCommentRepository, deleteCommentRepository } = require("./comment.repository");

module.exports.createCommentService = async function createCommentService(
  commentDetails
) {
  await createCommentRepository(commentDetails);
};

module.exports.getCommentsService = function getCommentsService(postId, parentCommentId) {
  return getCommentsRepository(postId, parentCommentId);
};

module.exports.updateCommentService = function updateCommentService(id, commentDetails) {
  return updateCommentRepository(id, commentDetails);
};

module.exports.deleteCommentService = function deleteCommentService(id) {
  return deleteCommentRepository(id);
};