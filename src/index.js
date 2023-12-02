const express = require('express');
const { router } = require('./router');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('../config/openapi/openapi.config');

const app = express();

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`[Virtual Life]: Server is up and running on port ${PORT}`);
});
