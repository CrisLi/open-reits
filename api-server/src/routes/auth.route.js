const { pick } = require('lodash');

const jwtPayloadFields = ['_id', 'username', 'org', 'roles'];

module.exports = async (fastify) => {

  const authOptions = {
    beforeHandler: fastify.auth([fastify.verifyUsernameAndPassword])
  };

  fastify.post('/auth', authOptions, async (request) => {
    const { user } = request;
    const payload = pick(user, jwtPayloadFields);
    const token = fastify.jwt.sign(payload, { expiresIn: '6h' });
    return { token };
  });

};
