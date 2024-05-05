const { Table, SearchDefaultLimit, SearchDefaultOffset, Friend, User } = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { UserDefaultSelect } = require('../user/user.enums');

module.exports.addFriendRepository = async function addFriendRepository(addFriend) {
  try {
    let queryBody = {};
    queryBody[Friend.USER_ID] = addFriend.userId;
    queryBody[Friend.FRIEND_ID] = addFriend.friendId;
    if (addFriend.userId > addFriend.friendId) {
      queryBody[Friend.USER_ID] = addFriend.friendId;
      queryBody[Friend.FRIEND_ID] = addFriend.userId;
    }

    await knexClient.insert(queryBody).into(Table.FRIEND);
  } catch (error) {
    console.log('[Friend Repository]');
    throw error;
  }
};

module.exports.searchFriendsRepository = async function searchFriendsRepository(userId, searchOptions) {
  let select = searchOptions.select || UserDefaultSelect;
  select = select.map((element) => `user.${element}`);
  const limit = searchOptions.paginate?.limit || SearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || SearchDefaultOffset;
  const sort = searchOptions.sort;

  const allFriendsSubQuery = knexClient
    .queryBuilder()
    .select([Friend.USER_ID, Friend.FRIEND_ID])
    .from(Table.FRIEND)
    .union(function () {
      this.select([Friend.FRIEND_ID, Friend.USER_ID]);
      this.from(Table.FRIEND);
    })
    .as(`${Table.FRIEND}`);

  let query = knexClient.queryBuilder().select(select).from(allFriendsSubQuery).leftJoin(`${Table.USER} AS user`, `${Table.FRIEND}.${Friend.FRIEND_ID}`, `user.${User.ID}`);

  query = applyFriendFilter(query, userId, searchOptions);

  query.limit(limit);
  query.offset(offset);

  if (sort) {
    sort.forEach((element) => {
      query.orderBy(element.orderBy, element.sortOrder);
    });
  }

  try {
    const friends = await query;

    return friends;
  } catch (error) {
    console.log('[Friend Repository]');
    throw error;
  }
};

module.exports.getFriendsSearchPaginateRepository = async function getFriendsSearchPaginateRepository(userId, searchOptions) {
  const limit = searchOptions.paginate?.limit || SearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || SearchDefaultOffset;

  const allFriendsSubQuery = knexClient
    .queryBuilder()
    .select([Friend.USER_ID, Friend.FRIEND_ID])
    .from(Table.FRIEND)
    .union(function () {
      this.select([Friend.FRIEND_ID, Friend.USER_ID]);
      this.from(Table.FRIEND);
    })
    .as(`${Table.FRIEND}`);

  let query = knexClient.queryBuilder().from(allFriendsSubQuery).leftJoin(`${Table.USER} AS user`, `${Table.FRIEND}.${Friend.FRIEND_ID}`, `user.${User.ID}`);

  query = applyFriendFilter(query, userId, searchOptions);

  try {
    const [{ count }] = await query.count(`${User.ID} AS count`);

    return {
      count,
      limit,
      offset,
    };
  } catch (error) {
    console.log('[Friend Repository]');
    throw error;
  }
};

function applyFriendFilter(query, userId, payload) {
  query.where(`${Table.FRIEND}.${Friend.USER_ID}`, userId);
  const filter = payload.filter;
  if (filter) {
    if (filter.friendsIds) {
      query.whereIn(`user.${User.ID}`, filter.friendsIds);
    }
    if (filter.friendsEmails) {
      query.whereIn(`user.${User.EMAIL}`, filter.friendsEmails);
    }
  }

  return query;
}

module.exports.removeFriendRepository = async function removeFriendRepository(userId, friendId) {
  if (userId > friendId) {
    let temp = userId;
    userId = friendId;
    friendId = temp;
  }

  try {
    return await knexClient
      .queryBuilder()
      .delete()
      .from(Table.FRIEND)
      .where({
        [Friend.USER_ID]: userId,
        [Friend.FRIEND_ID]: friendId,
      });
  } catch (error) {
    console.log('[Friend Repository]');
    throw error;
  }
};
