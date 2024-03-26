const express = require('express');
const { AuthController } = require('../auth/auth.controller');

const router = express.Router();

router.use('/auth', AuthController);

module.exports = router;
