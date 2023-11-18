const { Table, Comment } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table(Table.COMMENT, async (table) => {
    await table.dropForeign(Comment.PARENT_COMMENT_ID);
    await table.dropColumn(Comment.PARENT_COMMENT_ID);
    await table.integer(Comment.PARENT_COMMENT_ID).unsigned();
    await table
      .foreign(Comment.PARENT_COMMENT_ID)
      .references(Comment.ID)
      .inTable(Table.COMMENT)
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(Table.COMMENT, async (table) => {
    await table.dropColumn(Comment.PARENT_COMMENT_ID);
    await table
      .integer(Comment.PARENT_COMMENT_ID)
      .unsigned()
      .notNullable()
      .defaultTo(0);
    await table
      .foreign(Comment.PARENT_COMMENT_ID)
      .references(Comment.ID)
      .inTable(Table.COMMENT)
      .onDelete('CASCADE');
  });
};
