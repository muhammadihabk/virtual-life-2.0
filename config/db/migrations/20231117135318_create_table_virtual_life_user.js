const { Table, User } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable(Table.USER, (table) => {
    table.increments(User.ID);
    table.string(User.FIRST_NAME, 32).notNullable();
    table.string(User.LAST_NAME, 32).notNullable();
    table.date(User.DOB).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(Table.USER);
};
