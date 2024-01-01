const {
  createPostRepository,
  getPostByIdRepository,
  searchPostsRepository,
  searchPostsPaginateRepository,
  getHomefeedRepository,
  updatePostRepository,
  deletePostRepository,
  getHomefeedPaginateRepository,
} = require('./post.repository');

module.exports.createPostService = async function createPostService(
  postDetails
) {
  await createPostRepository(postDetails);
};

module.exports.getPostByIdService = function getPostByIdService(postId) {
  return getPostByIdRepository(postId);
};

module.exports.searchPostsService = async function searchPostsService(
  searchPosts
) {
  return {
    posts: await searchPostsRepository(searchPosts),
    paginate: await searchPostsPaginateRepository(searchPosts),
  };
};

module.exports.getHomefeedService = async function getHomefeedService(
  userId,
  paginateOptions
) {
  return {
    posts: await getHomefeedRepository(userId, paginateOptions),
    paginate: await getHomefeedPaginateRepository(userId, paginateOptions),
  };
};

module.exports.updatePostService = function updatePostService(
  postId,
  postDetails
) {
  return updatePostRepository(postId, postDetails);
};

module.exports.deletePostService = function deletePostService(postId) {
  return deletePostRepository(postId);
};
