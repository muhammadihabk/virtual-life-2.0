const { Table, AlterPost } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table(Table.POST, (table) => {
    table.dropColumn(AlterPost.REACTIONS_COUNTS);
    table.dropColumn(AlterPost.COMMENTS_COUNT);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(Table.POST, (table) => {
    table.json(AlterPost.REACTIONS_COUNTS).notNullable();
    table.integer(Post.COMMENTS_COUNT).notNullable();
  });
};
