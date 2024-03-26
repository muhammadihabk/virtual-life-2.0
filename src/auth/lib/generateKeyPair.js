const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const keyPair = crypto.generateKeyPairSync('rsa', {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
  privateKeyEncoding: {
    type: 'pkcs1',
    format: 'pem',
  },
});

fs.writeFileSync(path.join(__dirname, 'private.pem'), keyPair.privateKey);
fs.writeFileSync(path.join(__dirname, 'public.pem'), keyPair.publicKey);
