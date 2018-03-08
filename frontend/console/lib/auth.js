import Router from 'next/router';
import jwtDecode from 'jwt-decode';
import * as api from './api';

const TOKEN_KEY = 'SESSION_TOKEN';

export const isAuth = () => !!localStorage.getItem(TOKEN_KEY);

export const getToken = () => localStorage.getItem(TOKEN_KEY);

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
