const { User } = require('../../../config/db/db.enums');

UserDefaultSelect = [User.ID, User.FIRST_NAME, User.LAST_NAME, User.DOB, User.EMAIL];

UserAllowedSelect = UserDefaultSelect;

module.exports = {
  UserDefaultSelect,
  UserAllowedSelect,
};
