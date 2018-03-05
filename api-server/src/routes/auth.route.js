const ApiError = require('../lib/api-error');
const { pick } = require('lodash');

const jwtPayloadFields = ['_id', 'username', 'org', 'roles'];

module.exports = async (fastify) => {

  const { User } = fastify.models;

  fastify.post('/auth', async (request) => {
    const { username, password, org } = request.body;
    const user = await User.find().findByUsername(username, org);

    if (user && user.comparePassword(password)) {
      const token = fastify.jwt.sign(pick(user, jwtPayloadFields));
      return { token };
    }

    throw new ApiError('Invalid username or password', 401);
  });

};
