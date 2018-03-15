import { compose, withHandlers } from 'recompose';
import { Card, Row, Col, message } from 'antd';
import Router from 'next/router';
import enhance from '../../lib/enhance';
import { UserForm } from '../../components/users';

const UserNew = ({ handleSubmit, handleCancel }) => (
  <Row type="flex" justify="center">
    <Col span={12}>
      <Card title="Add User">
        <UserForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </Card>
    </Col>
  </Row>
);

export default compose(
  enhance(),
  withHandlers({
    handleSubmit: ({ handleApi }) => async (values) => {
      try {
        await handleApi({ method: 'createUser', params: [values] });
        message.success('Create User Success', 1, () => Router.push('/users'));
      } catch (e) {
        message.error(e.message);
      }
    },
    handleCancel: () => () => Router.push('/users')
  })
)(UserNew);
