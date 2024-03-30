const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

const privateKey = fs.readFileSync(path.join(__dirname, 'private.pem'), 'utf8');

module.exports.issueToken = (user) => {
  const payload = {
    sub: user.email,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1d' });

  return token;
};
