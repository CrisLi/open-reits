import { Spin, Row, Col, Menu, Dropdown, Button, Icon } from 'antd';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import '../../styles/index.less';

Router.onRouteChangeStart = (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
};

Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Header = withRouter(({ router, username, logout }) => {

  const handleClick = (e) => {
    if (e.key === '/logout') {
      logout();
    } else {
      router.push(e.key);
    }
  };

  const dropdownMenus = (
    <Menu onClick={handleClick}>
      <Menu.Item key="/settings">Settings</Menu.Item>
      <Menu.Item key="/logout">Logout</Menu.Item>
    </Menu>
  );

  return (
    <Row className="header">
      <Col span={2}>
        <Link href="/">
          <a><img src="/static/images/logo.png" className="logo" alt="logo" /></a>
        </Link>
      </Col>
      <Col span={20}>
        <Menu
          mode="horizontal"
          onClick={handleClick}
          selectedKeys={[router.pathname]}>
          <Menu.Item key="/">
            Home
          </Menu.Item>
          <Menu.Item key="/projects">
            Projects
          </Menu.Item>
          <Menu.Item key="/accounts">
            Account
          </Menu.Item>
          <Menu.Item key="/users">
            Users
          </Menu.Item>
        </Menu>
      </Col>
      <Col span={2}>
        <Dropdown overlay={dropdownMenus} trigger={['click']}>
          <Button className="header-dropdown-btn">
            {username} <Icon type="down" />
          </Button>
        </Dropdown>
      </Col>
    </Row>
  );
});

const Main = ({ content }) => (
  <div className="main-wrapper">
    <Row>
      <Col span={12}>
        {content}
      </Col>
    </Row>
  </div>
);

export default ({ children, loading = false, currentUser, logout }) => (
  <Spin spinning={loading} size="large">
    <Header username={currentUser.username} logout={logout} />
    <Main content={children} />
  </Spin>
);
