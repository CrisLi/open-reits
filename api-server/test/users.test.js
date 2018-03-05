describe('users api', () => {

  const testUser1 = { username: 'tester1', password: '123456' };
  const testUser2 = { username: 'tester2', password: '123456', org: 'client' };

  test('POST `/users`', async () => {
    let response = await process.app.inject({
      method: 'POST',
      url: '/users',
      payload: testUser1
    });
    expect(response.statusCode).toBe(200);

    response = await process.app.inject({
      method: 'POST',
      url: '/users',
      payload: testUser2
    });
    expect(response.statusCode).toBe(200);
  });

  test('POST `/users`', async () => {
    const response = await process.app.inject({
      method: 'POST',
      url: '/users',
      payload: testUser1
    });
    expect(response.statusCode).toBe(409);
  });

  test('POST `/auth`', async () => {
    let response = await process.app.inject({
      method: 'POST',
      url: '/auth',
      payload: testUser1
    });
    expect(response.statusCode).toBe(200);
    let payload = JSON.parse(response.payload);
    expect(payload['token']).toBeDefined();
    this.token1 = payload.token;

    response = await process.app.inject({
      method: 'POST',
      url: '/auth',
      payload: testUser2
    });
    expect(response.statusCode).toBe(200);
    payload = JSON.parse(response.payload);
    expect(payload['token']).toBeDefined();
    this.token2 = payload.token;
  });

  test('POST `/auth` 401', async () => {
    const response = await process.app.inject({
      method: 'POST',
      url: '/auth',
      payload: { username: testUser1.username, password: 'abcdef' }
    });
    expect(response.statusCode).toBe(401);
  });

  test('GET `/users`', async () => {
    const response = await process.app.inject({
      method: 'GET',
      url: '/users'
    });
    expect(response.statusCode).toBe(200);
    const users = JSON.parse(response.payload);
    expect(users).toHaveLength(2);
    expect(users[0]['_id']).toBeDefined();
    expect(users[0].username).toBe(testUser1.username);
  });

});
