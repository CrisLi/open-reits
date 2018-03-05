const fp = require('fastify-plugin');
const mongoose = require('mongoose');
const models = require('../models');

async function mongoosePlugin(fastify) {
  await mongoose.connect(process.env.DB_URL);
  const { db } = mongoose.connection;
  fastify.log.info(`Connected to database '${db.databaseName}'`);
  fastify.decorate('db', db);
  fastify.decorate('models', models);
  fastify.addHook('onClose', async () => {
    await mongoose.disconnect();
  });
}

module.exports = fp(mongoosePlugin);
