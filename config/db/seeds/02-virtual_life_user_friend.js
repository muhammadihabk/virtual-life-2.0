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
      USER_id: 1,
      friend_id: 2,
    },
    {
      USER_id: 1,
      friend_id: 3,
    },
    {
      USER_id: 1,
      friend_id: 4,
    },
    {
      USER_id: 1,
      friend_id: 5,
    },
    {
      USER_id: 2,
      friend_id: 3,
    },
    {
      USER_id: 2,
      friend_id: 5,
    },
    {
      USER_id: 2,
      friend_id: 6,
    },
    {
      USER_id: 2,
      friend_id: 7,
    },
    {
      USER_id: 4,
      friend_id: 6,
    },
    {
      USER_id: 6,
      friend_id: 7,
    },
    {
      USER_id: 8,
      friend_id: 11,
    },
    {
      USER_id: 9,
      friend_id: 11,
    },
  ]);
};
