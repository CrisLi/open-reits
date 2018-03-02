const fastify = require('fastify');

const db = require('./db');
const home = require('./routes/home.route');
const users = require('./routes/user.route');

module.exports = () => {

  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL,
      prettyPrint: process.env.LOG_PRETTY_PRINT,
    }
  });

  app.register(db);
  app.register(home);
  app.register(users, { prefix: '/users' });

  return app;
};
