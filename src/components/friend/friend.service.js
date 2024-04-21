const {
  addFriendRepository,
  searchFriendsRepository,
  getFriendsSearchPaginateRepository,
  removeFriendRepository,
} = require('./friend.repository');

module.exports.addFriendService = async function addFriendService(addFriend) {
  await addFriendRepository(addFriend);
};

module.exports.searchFriendsService = async function searchFriendsService(
  userId,
  searchFriends
) {
  return {
    friends: await searchFriendsRepository(userId, searchFriends),
    paginate: await getFriendsSearchPaginateRepository(userId, searchFriends),
  };
};

module.exports.removeFriendService = function removeFriendService(
  userId,
  friendId
) {
  return removeFriendRepository(userId, friendId);
};
