const { Table, VirtualLifeUser } = require("../enums");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.table(Table.VIRTUAL_LIFE_USER, (table) => {
    table.string(VirtualLifeUser.EMAIL, 64).notNullable();
    table.string(VirtualLifeUser.PASSWORD, 64).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable(Table.VIRTUAL_LIFE_USER, (table) => {
    table.dropColumn(VirtualLifeUser.EMAIL);
    table.dropColumn(VirtualLifeUser.PASSWORD);
  })
};
