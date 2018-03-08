import axios from 'axios';

const request = axios.create({
  baseURL: process.env.API_URL,
  timeout: 10000
});

request.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export const login = async ({ username, password, org = 'admin' }) => {

  const { data } = await request.post('/auth', {
    username,
    password,
    org
  });

  return data;
};

export const logout = async () => ({});
