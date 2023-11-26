const { Table, Comment, User, Post } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(Table.COMMENT, (table) => {
    table.increments(Comment.ID);
    table.integer(Comment.AUTHOR_ID).unsigned().notNullable();
    table.integer(Comment.POST_ID).unsigned().notNullable();
    table
      .integer(Comment.PARENT_COMMENT_ID)
      .unsigned()
      .notNullable()
      .defaultTo(0);
    table.text(Comment.COMMENT_TEXT).notNullable();
    table
      .datetime(Post.CREATED_AT)
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime(Post.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));
    table
      .foreign(Comment.AUTHOR_ID)
      .references(User.ID)
      .inTable(Table.USER)
      .onDelete('CASCADE');
    table
      .foreign(Comment.POST_ID)
      .references(Post.ID)
      .inTable(Table.POST)
      .onDelete('CASCADE');
    table
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
  return knex.schema.dropTableIfExists(Table.COMMENT);
};
