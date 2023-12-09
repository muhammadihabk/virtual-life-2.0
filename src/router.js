const express = require('express');
const { UserController } = require('./components/user/user.controller');

const router = express.Router();

router.use('/user', UserController);

module.exports.router = router;
