// require('dotenv').config();

module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      host: 'localhost',
      port: 3306,
      user: 'mo',
      password: 'pass',
      database: 'virtual_life',
    },
  },
  // production: {
  //   client: 'mysql2',
  //   connection: {
  //     host: process.env.MYSQL_HOST,
  //     port: 3306,
  //     user: process.env.MYSQL_USER,
  //     password: process.env.MYSQL_PASSWORD,
  //     database: process.env.MYSQL_DATABASE,
  //   },
  // },
};
