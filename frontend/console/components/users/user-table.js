import { Table } from 'antd';
import { dateTime } from '../../lib/format';


export default ({ users = [], renderActions }) => {

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
      render: (roles) => (<span>{roles.join(', ')}</span>)
    },
    {
      title: 'Provider',
      dataIndex: 'org',
      key: 'org',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (time) => (dateTime(time))
    }
  ];

  if (renderActions) {
    columns.push({
      title: ' ',
      dataIndex: '_id',
      key: 'actions',
      render: renderActions
    });
  }

  return <Table dataSource={users} columns={columns} rowKey="_id" />;
};
