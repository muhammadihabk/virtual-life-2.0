const knex = require('knex');

// const config = require('./knexFile')[process.env.NODE_ENV || 'development'];
const config = require('./knexFile')['development'];

module.exports = knex(config);
