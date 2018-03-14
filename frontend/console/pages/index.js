import { Button } from 'antd';
import Layout from '../components/layout';
import enhance from '../lib/enhance';
import { logout } from '../lib/auth';

export default enhance()(({ currnetUser }) => {
  console.log(currnetUser);
  return (
    <Layout>
      <Button type="primary" onClick={logout}>Hello {currnetUser.username}</Button>
    </Layout>
  );
});
