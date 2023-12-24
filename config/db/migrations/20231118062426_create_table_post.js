const { Table, Post, User, AlterPost } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(Table.POST, (table) => {
    table.increments(Post.ID);
    table.integer(Post.AUTHOR_ID).unsigned().notNullable();
    table.string(Post.POST_TEXT, '1000').notNullable();
    table.text(Post.POST_IMAGE).notNullable();
    table.json(AlterPost.REACTIONS_COUNTS).notNullable();
    table.integer(AlterPost.COMMENTS_COUNT).notNullable();
    table.boolean(AlterPost.IS_ACTIVE).notNullable().defaultTo(true);
    table
      .datetime(Post.CREATED_AT)
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP'));
    table
      .dateTime(Post.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'));

    table
      .foreign(Post.AUTHOR_ID)
      .references(User.ID)
      .inTable(Table.USER)
      .onDelete('CASCADE');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists(Table.POST);
};
