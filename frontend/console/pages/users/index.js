import { Card, Row, Col, Button, Divider } from 'antd';
import Link from 'next/link';
import enhance from '../../lib/enhance';
import * as api from '../../lib/api';
import UserTable from '../../components/users/user-table';
import ALertError from '../../components/alert-error';

const Users = ({ data: users, loading, error }) => (
  <Row type="flex" justify="center">
    <Col span={18}>
      <ALertError error={error} />
      <Card>
        <Link href="/users/new">
          <Button type="primary">Add User</Button>
        </Link>
        <Divider style={{ marginTop: 12, marginBottom: 12 }} />
        <UserTable users={users} loading={loading} />
      </Card>
    </Col>
  </Row>
);

const fetcher = {
  init: () => api.getUsers()
};

export default enhance({ fetcher })(Users);
