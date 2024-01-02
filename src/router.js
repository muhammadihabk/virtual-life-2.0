const express = require('express');
const { UserController } = require('./components/user/user.controller');
const { FriendController } = require('./components/friend/friend.controller');
const { PostController } = require('./components/post/post.controller');
const { ReactionsController } = require('./components/reaction/reaction.controller');

const router = express.Router();

router.use('/users', UserController);
router.use('/friends', FriendController);
router.use('/posts', PostController);
router.use('/reactions', ReactionsController);

module.exports.router = router;
