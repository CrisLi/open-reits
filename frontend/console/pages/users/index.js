import { Card, Row, Col, Button, Divider, message } from 'antd';
import { compose, lifecycle } from 'recompose';
import Link from 'next/link';
import enhance from '../../lib/enhance';
import UserTable from '../../components/users/user-table';

const withUsers = lifecycle({
  async componentDidMount() {
    try {
      const users = await this.props.handleApi('getUsers');
      this.setState({
        users
      });
    } catch (e) {
      message.error(e.message);
    }
  }
});

const Users = ({ users }) => (
  <Row type="flex" justify="center">
    <Col span={18}>
      <Card>
        <Link href="/users/new">
          <Button type="primary">Add User</Button>
        </Link>
        <Divider style={{ marginTop: 12, marginBottom: 12 }} />
        <UserTable users={users} />
      </Card>
    </Col>
  </Row>
);

export default compose(
  enhance(),
  withUsers
)(Users);
