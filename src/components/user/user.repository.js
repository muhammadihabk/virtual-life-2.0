const knexClient = require('../../../config/db/knex-client');
const { Table, User } = require('../../../config/db/enums');
const {
  UserSearchDefaultLimit,
  UserSearchDefaultOffset,
} = require('../../../config/db/db.config');
const { UserSearchDefaultSelect } = require('./enums');

async function createUserRepository(user) {
  try {
    await knexClient.queryBuilder().from(Table.USER).insert(user);
  } catch (error) {
    console.log('[User Repository]:', error);
    throw error;
  }
}

async function getUserByIdRepository(userId) {
  try {
    const [user] = await knexClient
      .queryBuilder()
      .select(UserSearchDefaultSelect)
      .from(Table.USER)
      .where({
        id: userId,
      });

    return user;
  } catch (error) {
    console.log('[User Repository]:', error);
    throw error;
  }
}

async function searchUsersRepository(searchOptions) {
  const select = searchOptions.select || UserSearchDefaultSelect;
  const limit = searchOptions.paginate?.limit || UserSearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || UserSearchDefaultOffset;
  const sort = searchOptions.sort;

  let query = knexClient.queryBuilder().select(select).from(Table.USER);

  query = applyUserFilter(query, searchOptions);

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
      console.log('[User Repository]:', error);
      throw error;
    });
}

async function getSearchPaginateRepository(searchOptions) {
  const searchResult = {};
  searchResult.limit = searchOptions.paginate?.limit || UserSearchDefaultLimit;
  searchResult.offset =
    searchOptions.paginate?.offset || UserSearchDefaultOffset;

  let query = knexClient.queryBuilder().from(Table.USER);

  query = applyUserFilter(query, searchOptions);

  try {
    const [{ count }] = await query.count(`${User.ID} AS count`);
    searchResult.count = count;

    return searchResult;
  } catch (error) {
    console.log('[User Repository]:', error);
    throw error;
  }
}

function applyUserFilter(query, payload) {
  const filter = payload.filter;
  if (filter) {
    if (filter.ids) {
      query.whereIn(User.ID, filter.ids);
    }
    if (filter.emails) {
      query.whereIn(User.EMAIL, filter.emails);
    }
  }

  return query;
}

async function updateUserRepository(userId, userBody) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .from(Table.USER)
      .update(userBody)
      .where({ id: userId });

    return countAffectedRows;
  } catch (error) {
    console.log('[User Repository]:', error);
    throw error;
  }
}

async function deleteUserRepository(userId) {
  try {
    const countDeletedRows = await knexClient
      .queryBuilder()
      .from(Table.USER)
      .del()
      .where({ id: userId });

    return countDeletedRows;
  } catch (error) {
    console.log('[User Repository]:', error);
    throw error;
  }
}

module.exports = {
  createUserRepository,
  getUserByIdRepository,
  searchUsersRepository,
  getSearchPaginateRepository,
  updateUserRepository,
  deleteUserRepository,
};
