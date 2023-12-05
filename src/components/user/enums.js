const { User } = require("../../../config/db/enums");

const UserSearchDefaultSelect = [User.FIRST_NAME, User.LAST_NAME, User.EMAIL, User.DOB];

module.exports = {
  UserSearchDefaultSelect,
};
