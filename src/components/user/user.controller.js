const express = require('express');
const { searchUsersService, createUserService, getUserByIdService, updateUserService, deleteUserService } = require('./user.service');
const { createUserSchema, searchUsersSchema, updateUserSchema } = require('./user.validation');
const ValidateOptions = require('../../../config/validation/validation.config');
const { internalErrorHandler } = require('../../utilities/errorHandlers/internalErrorHandler');

const router = express.Router();

router.post('/', async function createUser(req, res) {
  try {
    const { value: user, error } = createUserSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    await createUserService(user);

    res.sendStatus(201);
  } catch (error) {
    console.log('[User Controller]');
    internalErrorHandler(res, error);
  }
});

router.get('/:id', async function getUserById(req, res) {
  try {
    const user = await getUserByIdService(req.params.id);

    user ? res.json(user) : res.sendStatus(404);
  } catch (error) {
    console.log('[User Controller]:', error);
    res.sendStatus(500);
  }
});

router.post('/search', async function searchUsers(req, res) {
  try {
    const { value: searchOptions, error } = searchUsersSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const users = await searchUsersService(searchOptions);

    res.status(200).json(users);
  } catch (error) {
    console.log('[User Controller]');
    internalErrorHandler(res, error);
  }
});

router.patch('/:id', async function updateUser(req, res) {
  try {
    const { value: user, error } = updateUserSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const countAffectedRows = await updateUserService(req.params.id, user);

    countAffectedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[User Controller]');
    internalErrorHandler(res, error);
  }
});

router.delete('/:id', async function deleteUser(req, res) {
  try {
    const countDeletedRows = await deleteUserService(req.params.id);

    countDeletedRows == 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[User Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.UserController = router;
