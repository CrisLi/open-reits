import { compose, withState, withHandlers, pure } from 'recompose';
import * as api from '../api';

const handleApi = ({ setLoading }) => (options) => {
  setLoading(true);
  let result;
  if (typeof options === 'string') {
    result = api[options].apply(this);
  } else {
    const { method, params } = options;
    result = api[method].apply(this, params);
  }
  return result
    .then((data) => {
      setLoading(false);
      return data;
    })
    .catch((e) => {
      setLoading(false);
      throw e;
    });
};

// const handleApiError = ({ loading, apiError, setApiError }) => (fn) => {
//   if (!loading && apiError) {
//     setApiError(null);
//     fn(apiError);
//   }
// };

export default compose(
  withState('loading', 'setLoading', false),
  withState('apiError', 'setApiError'),
  withHandlers({
    handleApi
  }),
  pure
);
