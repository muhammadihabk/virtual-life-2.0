const supertest = require('supertest');
const { users } = require('../db/seeds/01-virtual_life_user');

module.exports.beforeEachTest = (app, refreshDatabase) => {
  return async () => {
    await refreshDatabase();
    const { id, salt, hash, ...newUser } = users[0];
    newUser.password = 'password';
    const response = await supertest(app).post('/auth/login').send({
      email: newUser.email,
      password: newUser.password,
    });
    global.token = JSON.parse(response.text).token;
  };
};
