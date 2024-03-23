const crypto = require('crypto');

const STRING_ENCODING = 'base64';
const HASH_KEY_LENGTH = 64;

module.exports.generatePassword = function generatePassword(password) {
  const salt = crypto.randomBytes(64).toString(STRING_ENCODING);
  const hash = crypto.scryptSync(password, salt, HASH_KEY_LENGTH).toString(STRING_ENCODING);
  return {
    salt,
    hash,
  };
};

module.exports.isValidPassword = function isValidPassword(password, salt, hash) {
  return crypto.scryptSync(password, salt, HASH_KEY_LENGTH).toString(STRING_ENCODING) === hash;
};
