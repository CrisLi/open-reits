const app = require('../src/app');
const path = require('path');
const { config } = require('dotenv');

module.exports = async () => {
  config({ path: path.resolve(__dirname, './.env.test') });
  process.app = app();
  await process.app.ready();
  global.app = app;
};
