import { Row, Col, Card, Alert, Spin } from 'antd';
import { withHandlers, compose } from 'recompose';
import '../styles/index.less';
import LoginForm from '../components/login-form';
import withEnhance from '../lib/enhance';

const withLoginHandler = withHandlers({
  handleLogin: ({ setLoading, setError, login }) => async (values) => {
    try {
      setLoading(true);
      await login(values);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  }
});

const LoginError = ({ error }) => {
  if (!error) {
    return <noscript />;
  }
  return (
    <div style={{ marginBottom: 10 }}>
      <Alert message={error} type="error" showIcon={false} />
    </div>
  );
};

const Login = ({ error, handleLogin, loading }) => (
  <Row>
    <Col sm={{ span: 20, offset: 2 }} md={{ span: 6, offset: 9 }}>
      <div className="login-wrapper">
        <Spin spinning={loading}>
          <Card title="Login">
            <LoginError error={error} />
            <LoginForm onSubmit={handleLogin} />
          </Card>
        </Spin>
      </div>
    </Col>
  </Row>
);

export default compose(
  withEnhance({ requireAuth: false }),
  withLoginHandler
)(Login);
