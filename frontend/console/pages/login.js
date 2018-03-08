import { Row, Col, Card, Alert, Spin } from 'antd';
import '../styles/index.less';
import LoginForm from '../components/login-form';
import withApi from '../lib/with-api';

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

const Login = ({ error, setError, setLoading, loading, auth }) => {

  const handleLogin = async (values) => {
    try {
      setLoading(true);
      await auth.login(values);
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <Row>
      <Col span={6} offset={9}>
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
};

export default withApi(Login);
