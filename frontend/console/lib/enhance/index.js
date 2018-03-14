import { compose, withProps } from 'recompose';
import * as auth from '../auth';
import withApi from './with-api';
import withAuth from './with-auth';

const defaultOptions = {
  requireAuth: true
};

export default (options = {}) => {
  const finalOptions = { ...defaultOptions, ...options };
  const { requireAuth } = finalOptions;
  if (requireAuth) {
    return compose(
      withApi,
      withAuth,
      withProps(() => ({
        logout: auth.logout
      }))
    );
  }
  return compose(
    withApi,
    withProps(() => ({
      login: auth.login
    }))
  );
};
