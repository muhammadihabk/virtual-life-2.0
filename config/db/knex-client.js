const knex = require('knex');

const config = require('./knexFile')[process.env.NODE_ENV || 'development'];

module.exports = knex(config);
