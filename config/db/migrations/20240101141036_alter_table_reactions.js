const { Table, Reaction } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table(Table.REACTION, (table) => {
    table.unique([Reaction.AUTHOR_ID, Reaction.ACTIVITY_ID, Reaction.ACTIVITY_KIND]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table(Table.REACTION, (table) => {
    table.dropUnique([Reaction.AUTHOR_ID, Reaction.ACTIVITY_ID, Reaction.ACTIVITY_KIND]);
  });
};
