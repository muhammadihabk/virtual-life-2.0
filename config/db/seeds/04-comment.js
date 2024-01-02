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
      author_id: 2,
      post_id: 1,
      comment_text: 'some comment',
    },
    {
      id: 2,
      author_id: 3,
      post_id: 1,
      parent_comment_id: 1,
      comment_text: 'some comment',
    },
    {
      id: 3,
      author_id: 4,
      post_id: 2,
      comment_text: 'some comment',
    },
    {
      id: 4,
      author_id: 5,
      post_id: 2,
      comment_text: 'some comment',
    },
    {
      id: 5,
      author_id: 6,
      post_id: 3,
      comment_text: 'some comment',
    },
    {
      id: 6,
      author_id: 7,
      post_id: 3,
      comment_text: 'some comment',
    },
    {
      id: 7,
      author_id: 7,
      post_id: 4,
      comment_text: 'some comment',
    },
    {
      id: 8,
      author_id: 6,
      post_id: 4,
      comment_text: 'some comment',
    },
    {
      id: 9,
      author_id: 5,
      post_id: 5,
      comment_text: 'some comment',
    },
    {
      id: 10,
      author_id: 4,
      post_id: 5,
      parent_comment_id: 9,
      comment_text: 'some comment',
    },
    {
      id: 11,
      author_id: 3,
      post_id: 6,
      comment_text: 'some comment',
    },
    {
      id: 12,
      author_id: 2,
      post_id: 6,
      comment_text: 'some comment',
    },
    {
      id: 13,
      author_id: 1,
      post_id: 7,
      comment_text: 'some comment',
    },
    {
      id: 14,
      author_id: 1,
      post_id: 7,
      comment_text: 'some comment',
    },
    {
      id: 15,
      author_id: 2,
      post_id: 8,
      comment_text: 'some comment',
    },
    {
      id: 16,
      author_id: 2,
      post_id: 8,
      comment_text: 'some comment',
    },
    {
      id: 17,
      author_id: 4,
      post_id: 5,
      parent_comment_id: 9,
      comment_text: 'some comment',
    },
  ]);
};
