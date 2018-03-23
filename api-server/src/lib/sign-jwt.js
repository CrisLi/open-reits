const { pick } = require('lodash');

const jwtPayloadFields = ['_id', 'username', 'org', 'roles'];

module.exports = (jwt) => (user) => {
  const payload = pick(user, jwtPayloadFields);
  return jwt.sign(payload, { expiresIn: '6h' });
};
