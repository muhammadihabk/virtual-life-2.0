const express = require('express');
const { router } = require('./router');

const app = express();

app.use(express.json());
app.use(router);

const PORT = 3000;
app.listen(3000, () => {
  console.log(`[Virtual Life]: Server is up and running on port ${PORT}`);
});
