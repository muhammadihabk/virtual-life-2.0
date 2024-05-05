const express = require('express');
const { searchUsersService, registerUserService, getUserByIdService, updateUserService, deleteUserService } = require('./user.service');
const { registerUserSchema, searchUsersSchema, updateUserSchema } = require('./user.validation');
const ValidateOptions = require('../../../config/validation/validation.config');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');
const { issueToken } = require('../../auth/lib/issueToken');

const router = express.Router();

module.exports.registerUser = async function registerUser(req, res) {
  try {
    const { value: user, error } = registerUserSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    await registerUserService(user);

    const token = issueToken(user);

    res.status(201).json({ token });
  } catch (error) {
    console.log('[User Controller]');
    errorHandler(res, error);
  }
};

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
    errorHandler(res, error);
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
    errorHandler(res, error);
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
