const express = require('express');
require('dotenv').config();
const appRouter = require('./routers/appRouter');
const authRouter = require('./routers/authRouter');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../config/openapi/openapi.config');
const passport = require('../config/auth/passport.config');
const { registerUser } = require('./components/user/user.controller');

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(authRouter);
app.post('/users', registerUser);
app.use(passport.authenticate('jwt', { session: false }), function handlePassportErrors(err, req, res, next) {
  if (err) {
    console.log('[Auth]', err);

    return res.sendStatus(500);
  }
  next();
});
app.use(appRouter);

module.exports = app;
