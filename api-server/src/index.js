require('dotenv').config();
const app = require('./app');

app.listen(process.env.PORT, '0.0.0.0', (err) => {
  if (err) throw err;
});
