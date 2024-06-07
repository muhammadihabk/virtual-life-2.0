const app = require('../../../app');
const supertest = require('supertest');
const { refreshDatabase } = require('./user.test-utilities');
const knexClient = require('../../../../config/db/knex-client');
const { Table, User } = require('../../../../config/db/db.enums');
const { beforeEachTest } = require('../../../../config/test/utilities.test');
const { newUser } = require('./user.test-data');

describe('User Endpoints', () => {
  describe('POST /users - Register a new user', () => {
    beforeEach(async () => {
      await refreshDatabase();
    });

    test('Should create a new user and respond with a new token', async () => {
      const [{ count: countUsersBefore }] = await knexClient.from(Table.USER).count(`${User.ID} AS count`);
      const response = await supertest(app).post('/users').send(newUser);
      const [{ count: countUsersAfter }] = await knexClient.from(Table.USER).count(`${User.ID} AS count`);
      expect(response.status).toBe(201);
      expect(JSON.parse(response.text)).toEqual(
        expect.objectContaining({
          token: expect.any(String),
        })
      );
      expect(countUsersAfter - countUsersBefore).toBe(1);
      const [recordedUser] = await knexClient.from(Table.USER).orderBy(User.ID, 'desc').limit(1);
      expect(recordedUser.email).toBe(newUser.email);
    });

    test('Should return 400 Bad Request', async () => {
      const response = await supertest(app).post('/users');
      expect(response.status).toBe(400);
    });
  });

  describe('GET /users/{id} - Get user by id', () => {
    beforeEach(beforeEachTest(app, refreshDatabase));

    test('Should return user with same id', async () => {
      const id = 1;
      const response = await supertest(app).get(`/users/${id}`).auth(global.token, { type: 'bearer' });
      expect(response.status).toBe(200);
      expect(JSON.parse(response.text).id).toEqual(id);
    });

    test('Should return 404 user not found', async () => {
      const id = 100;
      const response = await supertest(app).get(`/users/${id}`).auth(global.token, { type: 'bearer' });
      expect(response.status).toBe(404);
    });
  });

  describe('PATCH /users/{id} - Update a user', () => {
    beforeEach(beforeEachTest(app, refreshDatabase));

    test('Should return user with same id', async () => {
      const id = 1;
      const [userBefore] = await knexClient.from(Table.USER).where({ [User.ID]: id });
      const newValue = 'New test value';
      const response = await supertest(app).patch(`/users/${id}`).send({ firstName: newValue }).auth(global.token, { type: 'bearer' });
      const [userAfter] = await knexClient.from(Table.USER).where({ [User.ID]: id });

      expect(response.status).toBe(200);
      expect(userBefore.firstName).not.toEqual(newValue);
      expect(userAfter.firstName).toEqual(newValue);
    });

    test('Should return 404 user not found', async () => {
      const id = 100;
      const newValue = 'New test value';
      const response = await supertest(app).patch(`/users/${id}`).send({ firstName: newValue }).auth(global.token, { type: 'bearer' });

      expect(response.status).toBe(404);
    });
  });

  describe('DELETE /users/{id} - Update a user', () => {
    beforeEach(beforeEachTest(app, refreshDatabase));

    test('Should delete user', async () => {
      const [{ count: countUsersBefore }] = await knexClient.from(Table.USER).count(`${User.ID} AS count`);
      const id = 1;
      const [userBefore] = await knexClient.from(Table.USER).where({ [User.ID]: id });
      const response = await supertest(app).delete(`/users/${id}`).auth(global.token, { type: 'bearer' });
      const [{ count: countUsersAfter }] = await knexClient.from(Table.USER).count(`${User.ID} AS count`);
      const [userAfter] = await knexClient.from(Table.USER).where({ [User.ID]: id });

      expect(response.status).toBe(200);
      expect(countUsersBefore - countUsersAfter).toEqual(1);
      expect(userBefore.id).toBeDefined();
      expect(userAfter?.id).not.toBeDefined();
    });

    test('Should return 404 user not found', async () => {
      const id = 100;
      const response = await supertest(app).delete(`/users/${id}`).auth(global.token, { type: 'bearer' });

      expect(response.status).toBe(404);
    });
  });

  describe('POST /users/search - Find users', () => {
    beforeEach(async () => {
      await refreshDatabase();
    });

    test('Should return selected users and columns', async () => {
      const payload = {
        select: ['email', 'dob'],
        filter: {
          ids: [3, 4],
        },
      };
      const response = await supertest(app).post('/users/search').send(payload).auth(global.token, { type: 'bearer' });

      expect(response.status).toBe(200);
      const users = JSON.parse(response.text).users;
      users.filter((user) => {
        expect(Object.keys(user)).toHaveLength(2);
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('dob');
      });
      expect(users).toHaveLength(2);
    });

    test('Should return selected users', async () => {
      const emails = ['mr.sh@example.com', 'ad.mo@example.com'];
      const payload = {
        filter: {
          emails,
        },
      };
      const response = await supertest(app).post('/users/search').send(payload).auth(global.token, { type: 'bearer' });

      expect(response.status).toBe(200);
      const users = JSON.parse(response.text).users;
      expect(users.length).toEqual(2);
      expect(users.filter((user) => emails.includes(user.email)).length).toEqual(2);
    });
  });

  afterAll(async () => {
    await knexClient.destroy();
  });
});
