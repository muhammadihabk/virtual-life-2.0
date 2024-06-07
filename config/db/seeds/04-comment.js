const { Table } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.COMMENT).delete();
  await knex(Table.COMMENT).insert([
    {
      id: 1,
      authorId: 2,
      postId: 1,
      commentText: 'some comment',
    },
    {
      id: 2,
      authorId: 3,
      postId: 1,
      parentCommentId: 1,
      commentText: 'some comment',
    },
    {
      id: 3,
      authorId: 4,
      postId: 2,
      commentText: 'some comment',
    },
    {
      id: 4,
      authorId: 5,
      postId: 2,
      commentText: 'some comment',
    },
    {
      id: 5,
      authorId: 6,
      postId: 3,
      commentText: 'some comment',
    },
    {
      id: 6,
      authorId: 7,
      postId: 3,
      commentText: 'some comment',
    },
    {
      id: 7,
      authorId: 7,
      postId: 4,
      commentText: 'some comment',
    },
    {
      id: 8,
      authorId: 6,
      postId: 4,
      commentText: 'some comment',
    },
    {
      id: 9,
      authorId: 5,
      postId: 5,
      commentText: 'some comment',
    },
    {
      id: 10,
      authorId: 4,
      postId: 5,
      parentCommentId: 9,
      commentText: 'some comment',
    },
    {
      id: 11,
      authorId: 3,
      postId: 6,
      commentText: 'some comment',
    },
    {
      id: 12,
      authorId: 2,
      postId: 6,
      commentText: 'some comment',
    },
    {
      id: 13,
      authorId: 1,
      postId: 7,
      commentText: 'some comment',
    },
    {
      id: 14,
      authorId: 1,
      postId: 7,
      commentText: 'some comment',
    },
    {
      id: 15,
      authorId: 2,
      postId: 8,
      commentText: 'some comment',
    },
    {
      id: 16,
      authorId: 2,
      postId: 8,
      commentText: 'some comment',
    },
    {
      id: 17,
      authorId: 4,
      postId: 5,
      parentCommentId: 9,
      commentText: 'some comment',
    },
    {
      id: 18,
      authorId: 4,
      postId: 1,
      parentCommentId: 1,
      commentText: 'A reply',
    },
    {
      id: 19,
      authorId: 4,
      postId: 1,
      parentCommentId: 1,
      commentText: 'Another reply',
    },
    {
      id: 20,
      authorId: 5,
      postId: 1,
      commentText: 'Another comment',
    },
    {
      id: 21,
      authorId: 8,
      postId: 1,
      parentCommentId: 20,
      commentText: 'A reply',
    },
  ]);
};
