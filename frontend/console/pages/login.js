import { Row, Col, Card } from 'antd';
import LoginFrom from '../components/login-form';

export default () => {

  const handleLogin = (values) => {
    console.log(values);
  };

  return (
    <Row>
      <Col span={6} offset={9}>
        <div className="login-wrapper">
          <Card title="Login">
            <LoginFrom onSubmit={handleLogin} />
          </Card>
        </div>
      </Col>
    </Row>
  );
};
