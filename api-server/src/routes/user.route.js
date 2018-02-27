const postOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        username: { type: 'string', minLength: 3, pattern: '^[a-zA-Z0-9_\\-]+$' },
        password: { type: 'string', minLength: 6 },
        org: { type: 'string' },
        roles: {
          type: 'array',
          items: {
            type: 'string'
          }
        }
      },
      required: ['username', 'password']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          _id: { type: 'string' },
          username: { type: 'string' },
          org: { type: 'string' },
          roles: {
            type: 'array',
            items: {
              type: 'string'
            }
          },
          createdAt: { type: 'string' },
          updatedAt: { type: 'string' },
        }
      }
    }
  }
};

module.exports = async (fastify) => {

  const { User } = fastify.models;

  fastify.get('/', async () => (User.find({})));

  fastify.post('/', postOpts, async (request) => {
    const user = new User(request.body);
    await user.save();
    return user;
  });

};