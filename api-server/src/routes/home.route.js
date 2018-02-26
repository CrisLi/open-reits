async function routes(fastify) {
  fastify.get('/', async () => ({ server: 'reits-api-server', status: 'up' }));
}

module.exports = routes;
