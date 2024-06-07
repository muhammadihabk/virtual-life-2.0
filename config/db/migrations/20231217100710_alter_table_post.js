const { Table, Post, AlterPost } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table(Table.POST, (table) => {
    table.dropColumn(AlterPost.IS_ACTIVE);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(Table.POST, (table) => {
    table.boolean(AlterPost.IS_ACTIVE).notNullable().defaultTo(true);
  });
};
