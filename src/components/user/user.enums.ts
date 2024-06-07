import { User } from '../../../config/db/db.enums';

export enum UserDefaultSelect {
  id = User.ID,
  firstName = User.FIRST_NAME,
  lastName = User.LAST_NAME,
  dob = User.DOB,
  email = User.EMAIL,
}

export enum UserAllowedSelect {
  id = User.ID,
  firstName = User.FIRST_NAME,
  lastName = User.LAST_NAME,
  dob = User.DOB,
  email = User.EMAIL,
}
