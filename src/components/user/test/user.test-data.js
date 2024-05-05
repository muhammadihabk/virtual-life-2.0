const { users } = require('../../../../config/db/seeds/01-virtual_life_user');

const { id, email, salt, hash, ...newUser } = users[0];
newUser.email = 'testUser@example.com';
newUser.password = 'password';

module.exports.newUser = newUser;
