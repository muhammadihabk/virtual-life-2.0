const { createPostRepository, getPostByIdRepository, searchPostsRepository, searchPostsPaginateRepository } = require("./post.repository");

module.exports.createPostService = async function createPostService(postDetails) {
  await createPostRepository(postDetails);
};

module.exports.getPostByIdService = function getPostByIdService(postId) {
  return getPostByIdRepository(postId);
};

module.exports.searchPostsService = async function searchPostsService(searchPosts) {
  return {
    posts: await searchPostsRepository(searchPosts),
    paginate: await searchPostsPaginateRepository(searchPosts),
  };
}