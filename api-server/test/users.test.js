
describe('users api', () => {

  const testUser = { username: 'tester', password: '123456' };

  test('POST `/users`', async () => {
    const response = await process.app.inject({
      method: 'POST',
      url: '/users',
      payload: testUser
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST `/users`', async () => {
    const response = await process.app.inject({
      method: 'POST',
      url: '/users',
      payload: testUser
    });
    expect(response.statusCode).toBe(409);
  });

  test('GET `/users`', async () => {
    const response = await process.app.inject({
      method: 'GET',
      url: '/users'
    });
    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(users).toHaveLength(1);
    expect(users[0]['_id']).toBeDefined();
    expect(users[0].username).toBe(testUser.username);
  });

});
