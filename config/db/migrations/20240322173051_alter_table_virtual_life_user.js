const { Table, AlterUser, User } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table(Table.USER, (table) => {
    table.dropColumn(User.EMAIL);
    table.dropColumn(AlterUser.PASSWORD);
  });
  await knex.schema.table(Table.USER, (table) => {
    table.string(User.EMAIL, 64).unique().notNullable();
    table.string(User.SALT, 128).notNullable();
    table.string(User.HASH, 128).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(Table.USER, (table) => {
    table.dropColumns(User.SALT, User.HASH);
    table.string(AlterUser.PASSWORD, 64).notNullable();
    table.string(User.EMAIL, 64).notNullable();
  });
};
