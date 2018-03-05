const { pick } = require('lodash');

const jwtPayloadFields = ['_id', 'username', 'org', 'roles'];

module.exports = async (fastify) => {

  fastify.post('/auth', { beforeHandler: fastify.verifyUserAndPassword }, async (request) => {
    const { user } = request;
    const payload = pick(user, jwtPayloadFields);
    const token = fastify.jwt.sign(payload, { expiresIn: '6h' });
    return { token };
  });

};
