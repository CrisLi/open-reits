import request from './request';

export const getUsers = () => (request.get('/users'));

export const createUser = (payload) => (request.post('/users', payload));
