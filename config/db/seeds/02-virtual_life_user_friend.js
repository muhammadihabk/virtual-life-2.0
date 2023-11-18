const { Table } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(Table.FRIEND).delete();
  await knex(Table.FRIEND).insert([
    {
      virtual_life_user_id: 1,
      friend_id: 2,
    },
    {
      virtual_life_user_id: 1,
      friend_id: 3,
    },
    {
      virtual_life_user_id: 1,
      friend_id: 4,
    },
    {
      virtual_life_user_id: 1,
      friend_id: 5,
    },
    {
      virtual_life_user_id: 2,
      friend_id: 3,
    },
    {
      virtual_life_user_id: 2,
      friend_id: 5,
    },
    {
      virtual_life_user_id: 2,
      friend_id: 6,
    },
    {
      virtual_life_user_id: 2,
      friend_id: 7,
    },
    {
      virtual_life_user_id: 4,
      friend_id: 6,
    },
    {
      virtual_life_user_id: 6,
      friend_id: 7,
    },
    {
      virtual_life_user_id: 8,
      friend_id: 11,
    },
    {
      virtual_life_user_id: 9,
      friend_id: 11,
    },
  ]);
};
