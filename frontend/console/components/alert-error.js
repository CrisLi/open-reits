import { Alert } from 'antd';
import { branch, renderNothing } from 'recompose';

const AlertError = ({ error }) => (
  <div style={{ marginBottom: 10 }}>
    <Alert message={error.message || error} type="error" showIcon={false} />
  </div>
);

export default branch(
  ({ error }) => !error,
  renderNothing
)(AlertError);
