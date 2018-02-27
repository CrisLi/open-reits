module.exports = async (fastify) => {
  fastify.get('/', async () => ({ server: 'reits-api-server', status: 'up' }));
};
