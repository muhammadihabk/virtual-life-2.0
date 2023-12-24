const { Table, Post } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.table(Table.POST, (table) => {
    table.dropColumn(Post.POST_IMAGE);
  });
  await knex.schema.table(Table.POST, (table) => {
    table.text(Post.POST_IMAGE).defaultTo('NULL');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.table(Table.POST, (table) => {
    table.dropColumn(Post.POST_IMAGE);
  });
  await knex.schema.table(Table.POST, (table) => {
    table.text(Post.POST_IMAGE).notNullable();
  });
};
