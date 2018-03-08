import { compose, withState, withProps } from 'recompose';
import * as api from './api';
import * as auth from './auth';

export default compose(
  withState('loading', 'setLoading', false),
  withState('error', 'setError'),
  withProps(() => ({
    api,
    auth
  }))
);
