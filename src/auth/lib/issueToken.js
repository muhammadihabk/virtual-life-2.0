const jwt = require('jsonwebtoken');

const privateKey = process.env.PRIVATE_KEY;

module.exports.issueToken = (user) => {
  const payload = {
    sub: user.email,
  };
  const token = jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '1d' });

  return token;
};
