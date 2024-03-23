const { Table, Friend, User } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable(Table.FRIEND, (table) => {
    table.integer(Friend.USER_ID).unsigned().notNullable();
    table.integer(Friend.FRIEND_ID).unsigned().notNullable();
    table.datetime(Friend.CREATED_AT).defaultTo(knex.raw('CURRENT_TIMESTAMP')).notNullable();

    table.primary([Friend.USER_ID, Friend.FRIEND_ID]);
    table.foreign(Friend.USER_ID).references(User.ID).inTable(Table.USER).onDelete('CASCADE');
    table.foreign(Friend.FRIEND_ID).references(User.ID).inTable(Table.USER).onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(Table.FRIEND);
};
