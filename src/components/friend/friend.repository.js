const {
  Table,
  SearchDefaultLimit,
  SearchDefaultOffset,
  Friend,
  User,
} = require('../../../config/db/db.enums');
const knexClient = require('../../../config/db/knex-client');
const { UserSearchDefaultSelect } = require('../user/user.enums');

module.exports.addFriendRepository = async function addFriendRepository(
  addFriend
) {
  try {
    await knexClient.from(Table.FRIEND).insert(addFriend);
  } catch (error) {
    console.log('[Friend Repository]:', error);
    throw error;
  }
};

module.exports.searchFriendsRepository = async function searchFriendsRepository(
  userId,
  searchOptions
) {
  let select = searchOptions.select || UserSearchDefaultSelect;
  select = select.map((element) => `user.${element}`);
  const limit = searchOptions.paginate?.limit || SearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || SearchDefaultOffset;
  const sort = searchOptions.sort;

  const allFriendsSubQuery = knexClient
    .queryBuilder()
    .select(Friend.FRIEND_ID)
    .from(Table.FRIEND)
    .where(`${Friend.USER_ID}`, userId)
    .as(`${Table.FRIEND}`);

  let query = knexClient
    .queryBuilder()
    .select(select)
    .from(allFriendsSubQuery)
    .leftJoin(
      `${Table.USER} AS user`,
      `${Table.FRIEND}.${Friend.FRIEND_ID}`,
      `user.${User.ID}`
    );

  query = applyFriendFilter(query, searchOptions);

  query.limit(limit);
  query.offset(offset);

  if (sort) {
    sort.forEach((element) => {
      query.orderBy(element.orderBy, element.sortOrder);
    });
  }

  return query
    .then((rows) => rows)
    .catch((error) => {
      console.log('[Friend Repository]:', error);
      throw error;
    });
};

module.exports.getFriendsSearchPaginateRepository =
  async function getFriendsSearchPaginateRepository(userId, searchOptions) {
    const searchResult = {};
    searchResult.limit = searchOptions.paginate?.limit || SearchDefaultLimit;
    searchResult.offset = searchOptions.paginate?.offset || SearchDefaultOffset;

    const allFriendsSubQuery = knexClient
      .queryBuilder()
      .select(Friend.FRIEND_ID)
      .from(Table.FRIEND)
      .where(`${Friend.USER_ID}`, userId)
      .as(`${Table.FRIEND}`);

    let query = knexClient
      .queryBuilder()
      .from(allFriendsSubQuery)
      .leftJoin(
        `${Table.USER} AS user`,
        `${Table.FRIEND}.${Friend.FRIEND_ID}`,
        `user.${User.ID}`
      );

    query = applyFriendFilter(query, searchOptions);

    try {
      const [{ count }] = await query.count(`${User.ID} AS count`);
      searchResult.count = count;

      return searchResult;
    } catch (error) {
      console.log('[Friend Repository]:', error);
      throw error;
    }
  };

function applyFriendFilter(query, payload) {
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
