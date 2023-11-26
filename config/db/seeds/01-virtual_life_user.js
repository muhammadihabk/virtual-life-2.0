const { Table } = require('../enums');

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex(Table.USER).delete();
  await knex(Table.USER).insert([
    {
      id: 1,
      first_name: 'Muhammad',
      last_name: 'Ihab',
      email: 'mo.ih@example.com',
      user_password: 'pass',
      dob: new Date('1998-12-03'),
    },
    {
      id: 2,
      first_name: 'Ihab',
      last_name: 'Anass',
      email: 'ih.an@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 3,
      first_name: 'Hazim',
      last_name: 'Mostafa',
      email: 'ha.mo@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 4,
      first_name: 'Ahmed',
      last_name: 'Elsayed',
      email: 'ah.el@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 5,
      first_name: 'Omar',
      last_name: 'Elsayed',
      email: 'om.el@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 6,
      first_name: 'Mrwan',
      last_name: 'Shahin',
      email: 'mr.sh@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 7,
      first_name: 'Adham',
      last_name: 'Muhammad',
      email: 'ad.mo@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 8,
      first_name: 'rob',
      last_name: 'bot1',
      email: 'ro.bo1@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 9,
      first_name: 'rob',
      last_name: 'bot2',
      email: 'ro.bo2@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 10,
      first_name: 'rob',
      last_name: 'bot3',
      email: 'ro.bo3@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 11,
      first_name: 'rob',
      last_name: 'bot4',
      email: 'ro.bot4@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
    {
      id: 12,
      first_name: 'rob',
      last_name: 'bot5',
      email: 'ro.bot5@example.com',
      user_password: 'pass',
      dob: new Date('2000-01-01'),
    },
  ]);
};
