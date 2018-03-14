import Layout from './layout';

export default Layout;

export const withLayout = (BaseComponent) => ({ children, ...restProps }) => (
  <Layout {...restProps}>
    <BaseComponent {...restProps}>
      {children}
    </BaseComponent>
  </Layout>
);
