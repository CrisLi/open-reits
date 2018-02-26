const fastify = require('fastify')();

const home = require('./routes/home.route');

fastify.register(home);

module.exports = fastify;
