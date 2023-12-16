const { User } = require('../../../config/db/db.enums');

module.exports.UserSearchDefaultSelect = [
  User.FIRST_NAME,
  User.LAST_NAME,
  User.DOB,
  User.EMAIL,
];

module.exports.UserSearchAllowedSelect = [
  User.FIRST_NAME,
  User.LAST_NAME,
  User.DOB,
  User.EMAIL,
];
