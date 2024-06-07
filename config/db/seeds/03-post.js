const { Table } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.POST).delete();
  await knex(Table.POST).insert([
    {
      id: 1,
      authorId: 1,
      postText: 'My 1st post',
    },
    {
      id: 2,
      authorId: 2,
      postText: 'My 1st post',
    },
    {
      id: 3,
      authorId: 3,
      postText: 'My 1st post',
    },
    {
      id: 4,
      authorId: 7,
      postText: 'My 1st post',
    },
    {
      id: 5,
      authorId: 4,
      postText: 'My 1st post',
    },
    {
      id: 6,
      authorId: 4,
      postText: 'My 1st post',
    },
    {
      id: 7,
      authorId: 8,
      postText: 'My 1st post',
    },
    {
      id: 8,
      authorId: 6,
      postText: 'My 1st post',
    },
    {
      id: 9,
      authorId: 10,
      postText: 'My 1st post',
    },
    {
      id: 10,
      authorId: 11,
      postText: 'My 1st post',
    },
  ]);
};
