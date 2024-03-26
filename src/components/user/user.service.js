const { generatePassword } = require('../../../src/auth/lib/password');
const { searchUsersRepository, createUserRepository, getUserByIdRepository, getUsersSearchPaginateRepository, updateUserRepository, deleteUserRepository, authGetUserByEmailRepository } = require('./user.repository');

module.exports.createUserService = async function createUserService(createUserBody) {
  const { salt, hash } = generatePassword(createUserBody.password);
  createUserBody.salt = salt;
  createUserBody.hash = hash;
  delete createUserBody.password;

  await createUserRepository(createUserBody);
};

module.exports.getUserByIdService = function getUserByIdService(userId) {
  return getUserByIdRepository(userId);
};

module.exports.authGetUserByEmailService = function authGetUserByEmailService(userEmail) {
  return authGetUserByEmailRepository(userEmail);
};

module.exports.searchUsersService = async function searchUsersService(searchOptions) {
  return {
    users: await searchUsersRepository(searchOptions),
    paginate: await getUsersSearchPaginateRepository(searchOptions),
  };
};

module.exports.updateUserService = function updateUserService(userId, userBody) {
  return updateUserRepository(userId, userBody);
};

module.exports.deleteUserService = function deleteUserService(userId) {
  return deleteUserRepository(userId);
};
