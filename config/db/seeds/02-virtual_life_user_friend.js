const {
  CreateFriend,
} = require('../../../src/components/user/user.interfaces');
const { Table, Friend } = require('../db.enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.FRIEND).delete();
  await knex(Table.FRIEND).insert([
    new CreateFriend(1, 2),
    new CreateFriend(1, 3),
    new CreateFriend(1, 4),
    new CreateFriend(1, 5),
    new CreateFriend(2, 3),
    new CreateFriend(2, 5),
    new CreateFriend(2, 6),
    new CreateFriend(2, 7),
    new CreateFriend(4, 6),
    new CreateFriend(6, 7),
    new CreateFriend(8, 11),
    new CreateFriend(9, 11),
  ]);
};
