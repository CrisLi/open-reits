const signJwt = require('../lib/sign-jwt');

module.exports = async (fastify) => {

  fastify.post('/auth', { beforeHandler: fastify.verifyUserAndPassword }, async (request) => {
    const { user } = request;
    const token = signJwt(fastify.jwt)(user);
    return { token };
  });

};
