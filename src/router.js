const express = require('express');
const { userController } = require('./components/user/user.controller');

const router = express.Router();

router.use('/users', userController);

module.exports.router = router;