const fs = require('fs');
const jwt = require('jsonwebtoken');

const { tokenExpiresIn: expiresIn } = require('../config');

const privateKEY = fs.readFileSync(`${__dirname}/../../private.key`);
const publicKEY = fs.readFileSync(`${__dirname}/../../public.key`);

const issuer = 'GeekMed';
const algorithm = 'RS256';

module.exports = {
  create({ id, roleId, name, email }) {
    const signOptions = {
      issuer,
      expiresIn,
      algorithm,
    };

    return jwt.sign({ id, roleId, name, email }, privateKEY, signOptions);
  },

  verify(token) {
    const verifyOptions = {
      issuer,
      expiresIn,
      algorithm: [algorithm],
    };

    return jwt.verify(token, publicKEY, verifyOptions);
  },
};
