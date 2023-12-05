const express = require('express');
const {
  searchUsersService,
  createUserService,
  getUserByIdService,
  updateUserService,
  deleteUserService,
} = require('./user.service');

const app = express.Router();

app.post('/', async function createUser(req, res) {
  try {
    await createUserService(req.body);

    res.sendStatus(201);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.get('/:id', async function getUserById(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);

    user ? res.status(200).json(user) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.post('/search', async function searchUsers(req, res) {
  try {
    const users = await searchUsersService(req.body);

    res.status(200).json(users);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.patch('/:id', async function updateUser(req, res) {
  try {
    const countAffectedRows = await updateUserService(req.params.id, req.body);

    countAffectedRows == 1 ? res.sendStatus(204) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(400);
  }
});

app.delete('/:id', async function deleteUser(req, res) {
  try {
    const countDeletedRows = await deleteUserService(req.params.id);

    countDeletedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    res.sendStatus(400);
  }
});

module.exports.userController = app;
