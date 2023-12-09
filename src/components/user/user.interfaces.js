const { Friend } = require('../../../config/db/db.enums');

module.exports.CreateFriend = class CreateFriend {
  constructor(userId, friendId) {
    this[Friend.USER_ID] = userId;
    this[Friend.FRIEND_ID] = friendId;
  }
};
