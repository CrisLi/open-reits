const ApiError = require('../lib/api-error');

module.exports = async (fastify) => {

  const { User } = fastify.models;

  fastify.post('/auth', async (request) => {
    const { username, password, org } = request.body;
    const user = await User.find().findByUsername(username, org);

    if (user && user.comparePassword(password)) {
      return { token: 'a token' };
    }

    throw new ApiError('Invalid username or password', 401);
  });

};
