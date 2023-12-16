const {
  addFriendRepository,
  searchFriendsRepository,
  getFriendsSearchPaginateRepository,
} = require('./friend.repository');

module.exports.addFriendService = async function addFriendService(addFriend) {
  if (addFriend.virtual_life_user_id > addFriend.friend_id) {
    const temp = addFriend.virtual_life_user_id;
    addFriend.virtual_life_user_id = addFriend.friend_id;
    addFriend.friend_id = temp;
  }
  await addFriendRepository(addFriend);
};

module.exports.searchFriendService = async function searchFriendService(
  userId,
  addFriend
) {
  return {
    friends: await searchFriendsRepository(userId, addFriend),
    paginate: await getFriendsSearchPaginateRepository(userId, addFriend),
  };
};
