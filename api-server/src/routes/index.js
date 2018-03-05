const home = require('./home.route');
const users = require('./user.route');
const auth = require('./auth.route');

module.exports = async (fastify) => {
  fastify.register(home);
  fastify.register(users, { prefix: '/users' });
  fastify.register(auth);
};
