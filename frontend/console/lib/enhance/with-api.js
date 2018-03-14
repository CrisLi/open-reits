import { compose, withState, withProps } from 'recompose';
import * as api from '../api';

export default compose(
  withState('loading', 'setLoading', false),
  withState('error', 'setError'),
  withProps(() => ({
    api
  }))
);
