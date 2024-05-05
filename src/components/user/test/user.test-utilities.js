const { Table } = require('../../../../config/db/db.enums');
const knexClient = require('../../../../config/db/knex-client');
const { users } = require('../../../../config/db/seeds/01-virtual_life_user');

module.exports.refreshDatabase = async function refreshDatabase() {
  await knexClient(Table.USER).delete();
  await knexClient(Table.USER).insert(users);
};
