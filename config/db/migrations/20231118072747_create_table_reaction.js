const {
  Table,
  Reaction,
  ReactionReactionKind,
  ReactionActivityKind,
  User,
} = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable(Table.REACTION, (table) => {
    table.increments(Reaction.ID);
    table.integer(Reaction.AUTHOR_ID).unsigned().notNullable();
    table.integer(Reaction.ACTIVITY_ID).unsigned().notNullable();
    table
      .enum(Reaction.REACTION_KIND, Object.values(ReactionReactionKind))
      .notNullable();
    table
      .enum(Reaction.ACTIVITY_KIND, Object.values(ReactionActivityKind))
      .notNullable();
    table
      .foreign(Reaction.AUTHOR_ID)
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
  return knex.schema.dropTableIfExists(Table.REACTION);
};
