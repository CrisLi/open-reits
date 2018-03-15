import { Spin, Row, Col, Menu, Dropdown, Button, Icon } from 'antd';
import Link from 'next/link';
import Router, { withRouter } from 'next/router';
import NProgress from 'nprogress';
import '../../styles/index.less';

Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const menus = [
  {
    key: '/',
    isRoot: true,
    label: 'Home'
  },
  {
    key: '/projects',
    label: 'Projects'
  },
  {
    key: '/accounts',
    label: 'Account'
  },
  {
    key: '/users',
    label: 'Users'
  }
];

const Menus = ({ handleClick, pathname }) => {

  const selecteKey = menus
    .filter(({ isRoot }) => !isRoot)
    .map(({ key }) => key)
    .find((key) => pathname.startsWith(key)) || '/';

  return (
    <Menu
      mode="horizontal"
      onClick={handleClick}
      selectedKeys={[selecteKey]}>
      {
        menus.map((m) => (
          <Menu.Item key={m.key}>
            {m.label}
          </Menu.Item>
        ))
      }
    </Menu>
  );
};

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
        <Menus handleClick={handleClick} pathname={router.pathname} />
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
      <Col span={24}>
        {content}
      </Col>
    </Row>
  </div>
);

const Footer = () => (
  <footer className="footer">
    <div>Copyright © Chris</div>
  </footer>
);

export default ({ children, loading = false, currentUser, logout }) => (
  <Spin spinning={loading} size="large">
    <Header username={currentUser.username} logout={logout} />
    <Main content={children} />
    <Footer />
  </Spin>
);
