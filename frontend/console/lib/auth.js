import Router from 'next/router';
import * as api from './api';

export const isAuth = () => !!localStorage.getItem('user');

export const getUser = () => {
  const user = localStorage.getItem('user');
  try {
    return JSON.parse(user);
  } catch (e) {
    return null;
  }
};

export const login = async (values) => {
  const user = await api.login(values);
  localStorage.setItem('user', JSON.stringify(user));
  Router.push('/');
};

export const logout = async () => {
  await api.logout();
  localStorage.removeItem('user');
  Router.push('/login');
};
