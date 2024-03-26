const { User } = require('../../../config/db/db.enums');

module.exports.UserDefaultSelect = [User.FIRST_NAME, User.LAST_NAME, User.DOB, User.EMAIL];

module.exports.UserAllowedSelect = [User.FIRST_NAME, User.LAST_NAME, User.DOB, User.EMAIL];
