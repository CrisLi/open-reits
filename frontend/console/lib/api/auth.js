export const login = async ({ username, password, org = 'None' }) => {
  if (username === 'chris' && password === '123456') {
    return { username };
  }
  throw new Error('Username or Password wrong');
};

export const logout = async () => ({});
