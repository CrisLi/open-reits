const fastify = require('fastify');
const jwt = require('fastify-jwt');

const db = require('./db');
const home = require('./routes/home.route');
const users = require('./routes/user.route');
const auth = require('./routes/auth.route');

module.exports = () => {

  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL,
      prettyPrint: process.env.LOG_PRETTY_PRINT,
    }
  });

  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
  });
  app.register(db);
  // routes
  app.register(home);
  app.register(users, { prefix: '/users' });
  app.register(auth);

  return app;
};
