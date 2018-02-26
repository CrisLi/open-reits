const fastify = require('fastify')({
  logger: process.env.LOG_LEVEL
});

const home = require('./routes/home.route');

fastify.register(home);

module.exports = fastify;
