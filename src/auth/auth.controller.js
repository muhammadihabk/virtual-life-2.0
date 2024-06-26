const express = require('express');
const { issueToken } = require('../auth/lib/issueToken');
const { authGetUserByEmailService } = require('../components/user/user.service');
const { isValidPassword } = require('../auth/lib/password');
const { errorHandler } = require('../utilities/errorHandlers/errorHandler');
const { userLoginSchema } = require('./auth.validation');
const { ValidateOptions } = require('../../config/validation/validation.config');

const app = express();

app.post('/login', async (req, res) => {
  try {
    const { value: userLoginData, error } = userLoginSchema.validate(req.body, ValidateOptions);
    if (error) {
      throw error;
    }
    const user = await authGetUserByEmailService(userLoginData.email);
    if (!user) {
      console.log("[Auth]: Email isn't found.");
      return res.sendStatus(404);
    }
    if (!isValidPassword(userLoginData.password, user.salt, user.hash)) {
      console.log(`[Auth]: Invalid credentials for user`, user);
      return res.sendStatus(401);
    }

    res.json({
      token: issueToken(user),
    });
  } catch (error) {
    console.log('[Auth]');
    errorHandler(res, error);
  }
});

module.exports.AuthController = app;
