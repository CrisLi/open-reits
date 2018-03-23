import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import * as api from './api';

const TOKEN_KEY = 'SESSION_TOKEN';

export const isAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) {
    return false;
  }
  try {
    const jwt = jwtDecode(token);
    if (jwt.exp < Date.now() / 1000) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

export const getUser = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  try {
    return jwtDecode(token);
  } catch (e) {
    return null;
  }
};

export const login = async (values) => {
  const { token } = await api.login(values);
  localStorage.setItem(TOKEN_KEY, token);
  Router.push('/');
  return token;
};

export const logout = async () => {
  await api.logout();
  localStorage.removeItem(TOKEN_KEY);
  Router.push('/login');
};
