const express = require('express');
const indexRouter = require('./routers/indexRouter');
const authRouter = require('./routers/authRouter');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../config/openapi/openapi.config');
const passport = require('../config/auth/passport.config');

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(authRouter);
app.use(passport.authenticate('jwt', { session: false }), function handlePassportErrors(err, req, res, next) {
  if (err) {
    console.log('[Auth]', err);

    return res.sendStatus(500);
  }
});
app.use(indexRouter);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`[Virtual Life]: Server is up and running on port ${PORT}`);
});
