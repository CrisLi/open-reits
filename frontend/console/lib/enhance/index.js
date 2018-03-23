import { compose, withProps } from 'recompose';
import * as auth from '../auth';
import withFetcher from './with-fetcher';
import withAuth from './with-auth';
import { withLayout } from '../../components/layout';

const defaultOptions = {
  fetcher: {}
};

export default (options = {}) => {
  const finalOptions = { ...defaultOptions, ...options };
  return compose(
    withAuth,
    withProps(() => ({
      logout: auth.logout
    })),
    withLayout,
    withFetcher(finalOptions.fetcher)
  );
};

export { withFetcher };
