const { User } = require('../../../config/db/db.enums');

const UserSearchDefaultSelect = [
  User.FIRST_NAME,
  User.LAST_NAME,
  User.DOB,
  User.EMAIL,
];

const UserSearchAllowedSelect = [
  User.FIRST_NAME,
  User.LAST_NAME,
  User.DOB,
  User.EMAIL,
];

module.exports = {
  UserSearchDefaultSelect,
  UserSearchAllowedSelect,
};
