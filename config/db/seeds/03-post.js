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
      author_id: 1,
      post_text: 'My 1st post',
    },
    {
      id: 2,
      author_id: 2,
      post_text: 'My 1st post',
    },
    {
      id: 3,
      author_id: 3,
      post_text: 'My 1st post',
    },
    {
      id: 4,
      author_id: 7,
      post_text: 'My 1st post',
    },
    {
      id: 5,
      author_id: 4,
      post_text: 'My 1st post',
    },
    {
      id: 6,
      author_id: 4,
      post_text: 'My 1st post',
    },
    {
      id: 7,
      author_id: 8,
      post_text: 'My 1st post',
    },
    {
      id: 8,
      author_id: 6,
      post_text: 'My 1st post',
    },
    {
      id: 9,
      author_id: 10,
      post_text: 'My 1st post',
    },
    {
      id: 10,
      author_id: 11,
      post_text: 'My 1st post',
    },
  ]);
};
