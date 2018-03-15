import { Table, Button } from 'antd';
import Link from 'next/link';

const columns = [
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'span',
    render: (roles) => (<span>{roles.join(',')}</span>)
  },
  {
    title: 'Org',
    dataIndex: 'org',
    key: 'org',
  },
  {
    title: 'Created At',
    dataIndex: 'createAt',
    key: 'createAt',
  },
  {
    title: ' ',
    dataIndex: '_id',
    key: 'action',
    render: (id) => (
      <span>
        <Link href={{ pathname: '/users', query: { userId: id } }}>
          <Button size="small">Detail</Button>
        </Link>
      </span>
    )
  }
];

export default ({ users = [] }) => <Table dataSource={users} columns={columns} rowKey="_id" />;
