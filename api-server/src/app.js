const fastify = require('fastify')({
  logger: process.env.LOG_LEVEL
});

const db = require('./db');
const home = require('./routes/home.route');
const users = require('./routes/user.route');

fastify.register(db);
fastify.register(home);
fastify.register(users, { prefix: '/users' });

module.exports = fastify;
