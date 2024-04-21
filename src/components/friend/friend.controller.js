const express = require('express');
const { addFriendSchema, searchFriendsSchema } = require('./friend.validation');
const { addFriendService, searchFriendsService, removeFriendService } = require('./friend.service');
const ValidateOptions = require('../../../config/validation/validation.config');
const { errorHandler } = require('../../utilities/errorHandlers/errorHandler');

const router = express.Router();

router.post('/add', async function addFriend(req, res) {
  try {
    const { value: addFriend, error } = addFriendSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    addFriend.userId = req.user.id;
    await addFriendService(addFriend);
    res.sendStatus(201);
  } catch (error) {
    console.log('[Friend Controller]');
    errorHandler(res, error);
  }
});

router.post('/:userId/search', async function searchFriends(req, res) {
  try {
    const userId = req.params.userId;
    const { value: searchFriends, error } = searchFriendsSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }

    const friends = await searchFriendsService(userId, searchFriends);
    res.status(200).json(friends);
  } catch (error) {
    console.log('[Friend Controller]');
    errorHandler(res, error);
  }
});

router.delete('/:userId/:friendId', async function removeFriend(req, res) {
  if (req.user.id != req.params.userId) {
    return res.sendStatus(403);
  }

  try {
    const affectedRows = await removeFriendService(req.params.userId, req.params.friendId);

    affectedRows === 1 ? res.sendStatus(200) : res.sendStatus(404);
  } catch (error) {
    console.log('[Friend Controller]:', error);
    res.sendStatus(500);
  }
});

module.exports.FriendController = router;
