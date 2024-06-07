const { Table, Comment } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table(Table.COMMENT, (table) => {
    table.dropForeign(Comment.PARENT_COMMENT_ID);
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.dropColumn(Comment.PARENT_COMMENT_ID);
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.integer(Comment.PARENT_COMMENT_ID).unsigned();
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.foreign(Comment.PARENT_COMMENT_ID).references(Comment.ID).inTable(Table.COMMENT).onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table(Table.COMMENT, (table) => {
    table.dropForeign(Comment.PARENT_COMMENT_ID);
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.dropColumn(Comment.PARENT_COMMENT_ID);
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.integer(Comment.PARENT_COMMENT_ID).unsigned().notNullable().defaultTo(0);
  });
  await knex.schema.table(Table.COMMENT, (table) => {
    table.foreign(Comment.PARENT_COMMENT_ID).references(Comment.ID).inTable(Table.COMMENT).onDelete('CASCADE');
  });
};
