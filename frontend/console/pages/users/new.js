import { Card, Row, Col, message } from 'antd';
import Router from 'next/router';
import enhance from '../../lib/enhance';
import { UserForm } from '../../components/users';
import * as api from '../../lib/api';

const handleCancel = () => Router.push('/users');

const UserNew = ({ action: handleSubmit }) => (
  <Row type="flex" justify="center">
    <Col span={12}>
      <Card title="Add User">
        <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Card>
    </Col>
  </Row>
);

const fetcher = ({
  action: () => (values) => api.createUser(values)
    .then(() => message.success('Create User Success', 1, () => Router.push('/users')))
    .catch((err) => message.error(err.message))
});

export default enhance({ fetcher })(UserNew);
