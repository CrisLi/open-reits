const fp = require('fastify-plugin');
const ApiError = require('../lib/api-error');

module.exports = fp(async (fastify) => {

  fastify.decorate('verifyJwt', (request, reply, done) => {
    request.jwtVerify(done);
  });

  fastify.decorate('verifyUserAndPassword', async (request) => {
    const { User } = fastify.models;
    const { username, password, org } = request.body;
    const user = await User.find().findByUsername(username, org);
    if (user && user.comparePassword(password)) {
      request.user = user;
      return user;
    }
    throw new ApiError('Invalid username or password', 401);
  });

  fastify.decorate('jwtAuth', fastify.auth([fastify.verifyJwt]));

  fastify.decorate('userAndPasswordAuth', fastify.auth([fastify.verifyUserAndPassword]));

});
