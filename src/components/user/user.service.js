const {
  searchUsersRepository,
  createUserRepository,
  getUserByIdRepository,
  getSearchPaginateRepository,
  updateUserRepository,
  deleteUserRepository,
} = require('./user.repository');

function createUserService(createUserBody) {
  return createUserRepository(createUserBody);
}

function getUserByIdService(userId) {
  return getUserByIdRepository(userId);
}

async function searchUsersService(searchOptions) {
  return {
    users: await searchUsersRepository(searchOptions),
    paginate: await getSearchPaginateRepository(searchOptions),
  };
}

async function updateUserService(userId, userBody) {
  await updateUserRepository(userId, userBody);
}

async function deleteUserService(userId) {
  return await deleteUserRepository(userId);
}

module.exports = {
  createUserService,
  getUserByIdService,
  searchUsersService,
  updateUserService,
  deleteUserService,
};
