import axios from 'axios';
import env from '../env';
import { getToken } from '../auth';

const request = axios.create({
  baseURL: env.API_URL,
  timeout: 10000
});

request.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      const { headers } = config;
      headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

request.interceptors.response.use(
  (response) => {
    if (response.data) {
      return Promise.resolve(response.data);
    }
    return Promise.resolve(response);
  },
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

export default request;
