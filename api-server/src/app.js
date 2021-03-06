const fastify = require('fastify');
const jwt = require('fastify-jwt');
const auth = require('fastify-auth');
const cors = require('cors');
const db = require('./db');
const authDecorates = require('./lib/auth-decorates');
const routes = require('./routes');

module.exports = () => {

  const app = fastify({
    logger: {
      level: process.env.LOG_LEVEL,
      prettyPrint: process.env.LOG_PRETTY_PRINT,
    }
  });

  app.use(cors());
  app.register(jwt, {
    secret: process.env.JWT_SECRET || 'supersecret'
  });
  app.register(db);
  app.register(auth);
  app.register(authDecorates);
  app.register(routes);

  return app;
};
