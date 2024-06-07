const { generatePassword } = require('../../../src/auth/lib/password');
const { Table } = require('../db.enums');

let users = [
  {
    id: 1,
    firstName: 'Muhammad',
    lastName: 'Ihab',
    email: 'mo.ih@example.com',
    password: 'password',
    dob: '1998-12-03',
  },
  {
    id: 2,
    firstName: 'Ihab',
    lastName: 'Ahmed',
    email: 'ih.an@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 3,
    firstName: 'Hazim',
    lastName: 'Eisa',
    email: 'ha.mo@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 4,
    firstName: 'Ahmed',
    lastName: 'Ibrahim',
    email: 'ah.el@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 5,
    firstName: 'Omar',
    lastName: 'Ismail',
    email: 'om.el@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 6,
    firstName: 'Mrwan',
    lastName: 'Jacob',
    email: 'mr.sh@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 7,
    firstName: 'Adham',
    lastName: 'Musa',
    email: 'ad.mo@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 8,
    firstName: 'rob',
    lastName: 'bot1',
    email: 'ro.bo1@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 9,
    firstName: 'rob',
    lastName: 'bot2',
    email: 'ro.bo2@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 10,
    firstName: 'rob',
    lastName: 'bot3',
    email: 'ro.bo3@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 11,
    firstName: 'rob',
    lastName: 'bot4',
    email: 'ro.bot4@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
  {
    id: 12,
    firstName: 'rob',
    lastName: 'bot5',
    email: 'ro.bot5@example.com',
    password: 'password',
    dob: '2000-01-01',
  },
];
users = users.map((user) => {
  const { password, ...newUser } = user;
  const { salt, hash } = generatePassword(password);
  newUser.salt = salt;
  newUser.hash = hash;
  return newUser;
});

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.USER).delete();
  await knex(Table.USER).insert(users);
};

module.exports.users = users;
