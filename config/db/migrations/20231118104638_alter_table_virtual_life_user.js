const { Table, User } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table(Table.USER, (table) => {
    table.string(User.EMAIL, 64).notNullable();
    table.string(User.PASSWORD, 64).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.alterTable(Table.USER, (table) => {
    table.dropColumn(User.EMAIL);
    table.dropColumn(User.PASSWORD);
  });
};
