import request from './request';

export const getUsers = () => (request.get('/users'));

export const getUser = (id) => (request.get(`/users/${id}`));

export const createUser = (payload) => (request.post('/users', payload));
