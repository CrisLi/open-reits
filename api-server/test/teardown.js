const mongoose = require('mongoose');

module.exports = async () => {
  await mongoose.connection.dropDatabase();
  await process.app.close();
};
