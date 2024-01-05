const { Table } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.REACTION).delete();
  await knex(Table.REACTION).insert([
    {
      id: 1,
      author_id: 1,
      activity_id: 1,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 2,
      author_id: 2,
      activity_id: 1,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 3,
      author_id: 3,
      activity_id: 1,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 4,
      author_id: 4,
      activity_id: 2,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 5,
      author_id: 5,
      activity_id: 2,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 6,
      author_id: 6,
      activity_id: 2,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 7,
      author_id: 1,
      activity_id: 3,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 8,
      author_id: 2,
      activity_id: 3,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 9,
      author_id: 3,
      activity_id: 3,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 10,
      author_id: 1,
      activity_id: 4,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 11,
      author_id: 2,
      activity_id: 4,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 12,
      author_id: 3,
      activity_id: 4,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 13,
      author_id: 1,
      activity_id: 5,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 14,
      author_id: 2,
      activity_id: 5,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 15,
      author_id: 3,
      activity_id: 5,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 16,
      author_id: 1,
      activity_id: 6,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 17,
      author_id: 2,
      activity_id: 6,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 18,
      author_id: 3,
      activity_id: 6,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 19,
      author_id: 1,
      activity_id: 7,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 20,
      author_id: 5,
      activity_id: 7,
      reaction_kind: 'like',
      activity_kind: 'post',
    },
    {
      id: 21,
      author_id: 4,
      activity_id: 8,
      reaction_kind: 'like',
      activity_kind: 'post',
    },

    {
      id: 22,
      author_id: 4,
      activity_id: 1,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 23,
      author_id: 5,
      activity_id: 1,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 24,
      author_id: 7,
      activity_id: 1,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 25,
      author_id: 3,
      activity_id: 7,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 26,
      author_id: 3,
      activity_id: 2,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 27,
      author_id: 2,
      activity_id: 2,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 28,
      author_id: 4,
      activity_id: 3,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 29,
      author_id: 5,
      activity_id: 3,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 30,
      author_id: 7,
      activity_id: 3,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 31,
      author_id: 3,
      activity_id: 8,
      reaction_kind: 'love',
      activity_kind: 'post',
    },

    {
      id: 32,
      author_id: 4,
      activity_id: 5,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 33,
      author_id: 5,
      activity_id: 5,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 34,
      author_id: 7,
      activity_id: 5,
      reaction_kind: 'love',
      activity_kind: 'post',
    },
    {
      id: 35,
      author_id: 4,
      activity_id: 17,
      reaction_kind: 'love',
      activity_kind: 'comment',
    },
    {
      id: 36,
      author_id: 7,
      activity_id: 4,
      reaction_kind: 'sad',
      activity_kind: 'comment',
    },
    {
      id: 37,
      author_id: 7,
      activity_id: 17,
      reaction_kind: 'laugh',
      activity_kind: 'comment',
    },
    {
      id: 38,
      author_id: 1,
      activity_id: 17,
      reaction_kind: 'like',
      activity_kind: 'comment',
    },
  ]);
};
