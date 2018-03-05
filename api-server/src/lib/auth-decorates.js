const fp = require('fastify-plugin');
const ApiError = require('../lib/api-error');

module.exports = fp(async (fastify) => {

  fastify.decorate('verifyJwt', (request, reply, done) => {
    request.jwtVerify(done);
  });

  fastify.decorate('verifyUserAndPassword', (request, reply, done) => {
    const { User } = fastify.models;
    const { username, password, org } = request.body;
    User.find().findByUsername(username, org)
      .then((user) => {
        if (user && user.comparePassword(password)) {
          request.user = user;
          done();
        }
        throw new ApiError('Invalid username or password', 401);
      })
      .catch((err) => done(err));
  });

  fastify.decorate('jwtAuth', fastify.auth([fastify.verifyJwt]));

  fastify.decorate('userAndPasswordAuth', fastify.auth([fastify.verifyUserAndPassword]));

});
