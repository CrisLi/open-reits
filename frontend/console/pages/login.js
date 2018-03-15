import { Row, Col, Card, Spin } from 'antd';
import { withHandlers, withState, compose } from 'recompose';
import '../styles/index.less';
import LoginForm from '../components/login-form';
import ALertError from '../components/alert-error';
import withEnhance from '../lib/enhance';

const handleLogin = ({ setLoading, setError, login }) => async (values) => {
  try {
    setLoading(true);
    await login(values);
  } catch (e) {
    setError(e.message);
    setLoading(false);
  }
};

const withLoginHandler = compose(
  withState('error', 'setError', null),
  withHandlers({ handleLogin })
);

const Login = ({ error, handleLogin: login, loading }) => (
  <Row>
    <Col sm={{ span: 20, offset: 2 }} md={{ span: 6, offset: 9 }}>
      <div className="login-wrapper">
        <Spin spinning={loading}>
          <Card title="Login">
            <ALertError error={error} />
            <LoginForm onSubmit={login} />
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
