const express = require('express');
const { UserController } = require('./components/user/user.controller');
const { FriendController } = require('./components/friend/friend.controller');
const { PostController } = require('./components/post/post.controller');

const router = express.Router();

router.use('/users', UserController);
router.use('/friends', FriendController);
router.use('/posts', PostController);

module.exports.router = router;
