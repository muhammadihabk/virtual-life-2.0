const { Table, VirtualLifeUser } = require("../enums");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  return knex.schema.createTable(Table.VIRTUAL_LIFE_USER, (table) => {
    table.increments(VirtualLifeUser.ID);
    table.string(VirtualLifeUser.FIRST_NAME, 32).notNullable();
    table.string(VirtualLifeUser.LAST_NAME, 32).notNullable();
    table.date(VirtualLifeUser.DOB).notNullable();
  })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists(Table.VIRTUAL_LIFE_USER);
};
