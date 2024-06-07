import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';

// const { generatePassword } = require('../../../src/auth/lib/password');
const { searchUsersRepository, createUserRepository, getUserByIdRepository, getUsersSearchPaginateRepository, updateUserRepository, deleteUserRepository, authGetUserByEmailRepository } = require('./user.repository');

// module.exports.registerUserService = async function registerUserService(registerUserData) {
//   const { salt, hash } = generatePassword(registerUserData.password);
//   registerUserData.salt = salt;
//   registerUserData.hash = hash;
//   delete registerUserData.password;

//   await createUserRepository(registerUserData);
// };

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}
  getUserById(userId) {
    return this.userRepository.getUserById(userId);
  }

  authGetUserByEmail(userEmail) {
    return this.userRepository.authGetUserByEmail(userEmail);
  }

  async searchUsers(searchOptions) {
    return {
      users: await this.userRepository.searchUsers(searchOptions),
      paginate: await this.userRepository.getUsersSearchPaginate(searchOptions),
    };
  }

  updateUser(userId, userBody) {
    return this.userRepository.updateUser(userId, userBody);
  }

  deleteUser(userId) {
    return this.userRepository.deleteUser(userId);
  }
}
