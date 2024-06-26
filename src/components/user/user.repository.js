const knexClient = require('../../../config/db/knex-client');
const { Table, User, SearchDefaultLimit, SearchDefaultOffset } = require('../../../config/db/db.enums');
const { UserDefaultSelect } = require('./user.enums');

module.exports.createUserRepository = async function createUserRepository(user) {
  try {
    await knexClient.queryBuilder().insert(user).into(Table.USER);
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};

module.exports.getUserByIdRepository = async function getUserByIdRepository(userId) {
  try {
    const [user] = await knexClient
      .queryBuilder()
      .select(UserDefaultSelect)
      .from(Table.USER)
      .where({
        [User.ID]: userId,
      });

    return user;
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};

module.exports.authGetUserByEmailRepository = async function authGetUserByEmailRepository(userEmail) {
  try {
    const [user] = await knexClient
      .queryBuilder()
      .select(UserDefaultSelect.concat([User.SALT, User.HASH]))
      .from(Table.USER)
      .where({
        [User.EMAIL]: userEmail,
      });

    return user;
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};

module.exports.searchUsersRepository = async function searchUsersRepository(searchOptions) {
  const select = searchOptions.select || UserDefaultSelect;
  const limit = searchOptions.paginate?.limit || SearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || SearchDefaultOffset;
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
      console.log('[User Repository]');
      throw error;
    });
};

module.exports.getUsersSearchPaginateRepository = async function getUsersSearchPaginateRepository(searchOptions) {
  const limit = searchOptions.paginate?.limit || SearchDefaultLimit;
  const offset = searchOptions.paginate?.offset || SearchDefaultOffset;

  let query = knexClient.queryBuilder().from(Table.USER);

  query = applyUserFilter(query, searchOptions);

  try {
    const [{ count }] = await query.count(`${User.ID} AS count`);

    return {
      count,
      limit,
      offset,
    };
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};

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

module.exports.updateUserRepository = async function updateUserRepository(userId, userBody) {
  try {
    const countAffectedRows = await knexClient
      .queryBuilder()
      .update(userBody)
      .from(Table.USER)
      .where({ [User.ID]: userId });

    return countAffectedRows;
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};

module.exports.deleteUserRepository = async function deleteUserRepository(userId) {
  try {
    const countDeletedRows = await knexClient
      .queryBuilder()
      .from(Table.USER)
      .del()
      .where({ [User.ID]: userId });

    return countDeletedRows;
  } catch (error) {
    console.log('[User Repository]');
    throw error;
  }
};
