const knex = require('knex');

const config = require('./knexFile');

module.exports = knex(config.development);
