const isProd = process.env.NODE_ENV === 'production';

module.exports = {
  'process.env.API_URL': isProd ? 'http://localhost:3001' : 'http://localhost:3001'
};
