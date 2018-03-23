import { Row, Col, Card, Spin } from 'antd';
import '../styles/index.less';
import LoginForm from '../components/login-form';
import ALertError from '../components/alert-error';
import { withFetcher } from '../lib/enhance';
import { login } from '../lib/auth';

const Login = ({ error, action: handleLogin, loading }) => (
  <Row type="flex" justify="center">
    <Col span={8}>
      <div className="login-wrapper">
        <Spin spinning={loading}>
          <Card title="Login">
            <ALertError error={error} />
            <LoginForm onSubmit={handleLogin} />
          </Card>
        </Spin>
      </div>
    </Col>
  </Row>
);

export default withFetcher({
  action: () => (params) => login(params)
})(Login);
