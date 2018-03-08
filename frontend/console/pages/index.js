import { Button } from 'antd';
import Layout from '../components/layout';
import withAuth from '../lib/with-auth';
import { logout } from '../lib/auth';

export default withAuth(({ currnetUser }) => {
  console.log(currnetUser);
  return (
    <Layout>
      <Button type="primary" onClick={logout}>Hello {currnetUser.username}</Button>
    </Layout>
  );
});
