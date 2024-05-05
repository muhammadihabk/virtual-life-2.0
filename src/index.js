const app = require('./app');

const PORT = 3000;
app.listen(3000, () => {
  console.log(`[Virtual Life]: Server is up and running on port ${PORT}`);
});
