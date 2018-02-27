const fastifyPlugin = require('fastify-plugin');
const mongoose = require('mongoose');
const models = require('../models');

async function mongoosePlugin(fastify) {
  await mongoose.connect(process.env.DB_URL);
  const db = mongoose.connection;
  fastify.log.info(`Connectet to database '${mongoose.connection.db.databaseName}'`);
  fastify.decorate('db', db);
  fastify.decorate('models', models);
}

module.exports = fastifyPlugin(mongoosePlugin);
