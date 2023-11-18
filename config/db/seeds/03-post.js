const { Table } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex(Table.POST).delete();
  await knex(Table.POST).insert([
    {
      id: 1,
      author_id: 1,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 4,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 2,
      author_id: 2,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 2,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 3,
      author_id: 3,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 4,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 4,
      author_id: 7,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 0,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 5,
      author_id: 4,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 4,
        sad: 0,
        laugh: 0,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 6,
      author_id: 4,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 3,
        love: 4,
        sad: 0,
        laugh: 0,
        angry: 0,
      },
      comments_count: 2,
    },
    {
      id: 7,
      author_id: 8,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 2,
        love: 4,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 3,
    },
    {
      id: 8,
      author_id: 6,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 1,
        love: 0,
        sad: 0,
        laugh: 1,
        angry: 0,
      },
      comments_count: 4,
    },
    {
      id: 9,
      author_id: 10,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 0,
        love: 0,
        sad: 0,
        laugh: 0,
        angry: 0,
      },
      comments_count: 0,
    },
    {
      id: 10,
      author_id: 11,
      post_text: 'My 1st post',
      post_image: '',
      reactions_counts: {
        like: 0,
        love: 0,
        sad: 0,
        laugh: 0,
        angry: 0,
      },
      comments_count: 0,
    },
  ]);
};
