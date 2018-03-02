describe('home api', () => {

  test(('GET `/`'), async () => {
    const response = await process.app.inject({ method: 'GET', url: '/' });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.payload)['status']).toBeDefined();
  });

});
